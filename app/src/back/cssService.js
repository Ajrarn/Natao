(function () {
    "use strict";

    var _ = require('lodash')
        ,fs = require('fs')
        ,cssParser = require('css');


    angular
        .module('Natao')
        .service('CssService', CssService)
        .run(run);

    //Start of the service
    function run() {
    }


    /**
     * Create the CssService
     * @param $translate
     * @param $q
     * @param PendingService
     * @param DatabaseService
     * @returns {CssService}
     * @constructor
     */
    function CssService($translate,$q,PendingService,DatabaseService) {

        var self = this;

        self.$translate = $translate;
        self.$q = $q;
        self.PendingService = PendingService;
        self.DatabaseService = DatabaseService;


        /**
         * Initialization of the service
         * @returns {*} return a promise
         */
        self.getInitCss = function() {

            return self.$q(function(resolve,reject) {

                //Then we search for existing css documents
                self.DatabaseService
                    .find({docName:'css'})
                    .then(function(docs) {
                        if (docs.length === 0) {
                            //If there is no document we will add the defaults css

                            var language = self.$translate.use();

                            //First we load the names of the css in the appropriate language
                            self.cssNamesFile = fs.readFileSync('./languages/cssNames-' + language + '.json','utf8');
                            self.cssNames = {};

                            try {
                                self.cssNames = JSON.parse(self.cssNamesFile);
                            }
                            catch (err) {
                                reject(err);
                            }

                            var pathCss = './default_css';
                            self.availableCss = [];

                            //We will read the files in the path and add it to the availableCss
                            var defaultFilesCss = fs.readdirSync(pathCss);
                            var nbfilesPending = defaultFilesCss.length;

                            defaultFilesCss.forEach(function(file) {
                                var cssContent = fs.readFileSync(pathCss + '/' + file,'utf8');

                                var nameToTranslate = _.find(self.cssNames,{originalName:file});

                                var docCss = {
                                    docName:'css',
                                    name: nameToTranslate.inDatabaseName,
                                    default: nameToTranslate.default,
                                    css: cssContent
                                };

                                self.DatabaseService
                                    .save(docCss)
                                    .then(function(doc) {
                                        self.availableCss.push(doc);
                                        nbfilesPending--;
                                        if (nbfilesPending === 0) {
                                            self.defaultCss = _.find(self.availableCss, {default: true});
                                            resolve(self.defaultCss);
                                        }
                                    })
                                    .catch(function(err) {
                                        reject(err);
                                    });

                            });

                        } else {
                            self.availableCss = docs;
                            self.defaultCss = _.find(self.availableCss,{default:true});
                            resolve(self.defaultCss);
                        }
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        };

        /**
         * insert the new Css document in the database
         * @param newCss
         */
        self.addCss = function(newCss) {

            self.DatabaseService
                .save(newCss)
                .catch(function(err) {
                    console.error(err);
                });
            
        };

        /**
         * create a new css document with its name
         * and insert it in the database
         * @param nameCss
         * @returns {*} a promise
         */
        self.addCssNamed = function(nameCss) {
            var docCss = {
                docName:'css',
                name: nameCss,
                default: false,
                css: null
            };
            

            return self.$q(function(resolve,reject) {
                
                self.DatabaseService
                    .save(docCss)
                    .then(function(doc) {
                        self.availableCss.push(doc);
                        resolve(doc);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });

        };

        /**
         * init the current css by finding it
         * in the database with its id
         * @param idCss
         */
        self.initCurrentById = function(idCss) {
            var css = _.find(self.availableCss,{_id:idCss});
            self.currentCss = self.safeCss(css.css);
        };

        /**
         * init the current css with a css document
         * already loaded
         * @param css
         */
        self.initCurrentByContent = function(css) {
            self.currentCss = self.safeCss(css);
        };

        self.findCssId = function(what) {
            var result = _.find(self.availableCss,{_id:what});
            if (!result) {
                result = _.find(self.availableCss, {name:what});

                if (!result) {
                    result = _.find(self.cssNames, {originalName:what});
                    if (result) {
                        result = _.find(self.availableCss,{name:result.inDatabaseName})
                    }
                }
            }

            return result._id;
        };

        /**
         * save a css document in the database
         * @param css
         */
        self.saveCss = function(css) {

            //default
            if (css.default) {
                if (css._id) {
                    var result = _.find(self.availableCss, {default:true});
                    if (result && css._id != result._id) {
                        css.default = false;
                    }
                } else {
                    css.default = false;
                }
            }
            if (css._id) {
                
                self.DatabaseService
                    .save(css)
                    .then(function(doc) {
                        css = doc;
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            
            } else {
                
                self.DatabaseService
                    .save(css)
                    .then(function(doc) {
                        self.availableCss.push(doc);
                        css = doc;
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }
        };

        /**
         * delete a css document from the database
         * @param css
         */
        self.deleteCss = function(css) {
            if (css._id) {
                self.PendingService.start();
                var indexCss = _.findIndex(self.availableCss,{_id:css._id});

                if (indexCss && indexCss >= 0) {
                    self.availableCss.splice(indexCss,1);
                }
                
                self.DatabaseService
                    .remove(css._id)
                    .catch(function(err) {
                        console.error(err);
                    });
            }
        };

        /**
         * to avoid css disease add #viewer to each rule
         * @param css
         * @returns {*}
         */
        self.safeCss = function(css) {
            var objCss = cssParser.parse(css);

            var newRules = objCss.stylesheet.rules.map(function(rule) {
                var newRule = rule;
                if (rule.type === 'rule') {

                    var newSelectors = rule.selectors.map(function(selector) {
                        if (!selector.startsWith('#viewer')) {
                            return '#viewer ' + selector;
                        } else {
                            return selector;
                        }
                    });

                    newRule.selectors = newSelectors;
                }
                return newRule
            });

            objCss.stylesheet.rules = newRules;

            return cssParser.stringify(objCss);

        };

        return self;
    }

}());