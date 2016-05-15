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
        console.log('run');
    }


    //Service itself
    function CssService($translate,$q,PendingService,DatabaseService) {
        console.log('CssService');

        var self = this;

        self.$translate = $translate;
        self.$q = $q;
        self.PendingService = PendingService;
        self.DatabaseService = DatabaseService;



        self.getInitCss = function() {

            return self.$q(function(resolve,reject) {


                //First we load the names of the css in the appropriate language
                self.cssNamesFile = fs.readFileSync('./languages/cssNames-' + self.$translate.use() + '.json','utf8');
                self.cssNames = {};

                var defaultCss = null;

                try {
                    self.cssNames = JSON.parse(self.cssNamesFile);
                }
                catch (err) {
                    reject(err);
                }

                //Then we search for existing css documents
                self.DatabaseService
                    .find({docName:'css'})
                    .then(function(docs) {
                        if (docs.length === 0) {

                            //If there is no document we will add the defaults css
                            var pathCss = './default_css';
                            self.availableCss = [];

                            //We will read the fils in the path and it to the availableCss
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
                                    .insert(docCss)
                                    .then(function(doc) {
                                        self.availableCss.push(doc);
                                        nbfilesPending--;
                                        if (nbfilesPending === 0) {
                                            defaultCss = _.find(self.availableCss, {default: true});
                                            resolve(defaultCss);
                                        }
                                    })
                                    .catch(function(err) {
                                        reject(err);
                                    });

                            });

                        } else {
                            self.availableCss = docs;
                            defaultCss = _.find(self.availableCss,{default:true});
                            resolve(defaultCss);
                        }
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        };

        self.addCss = function(newCss) {

            self.DatabaseService
                .insert(newCss)
                .then(function(doc) {
                    console.log(doc);
                })
                .catch(function(err) {
                    console.error(err);
                });
            
        };

        self.addCssNamed = function(nameCss) {
            var docCss = {
                docName:'css',
                name: nameCss,
                default: false,
                css: null
            };
            

            return self.$q(function(resolve,reject) {
                
                self.DatabaseService
                    .insert(docCss)
                    .then(function(doc) {
                        self.availableCss.push(doc);
                        resolve(doc);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });

        };

        self.initCurrentById = function(idCss) {
            var css = _.find(self.availableCss,{_id:idCss});
            self.currentCss = self.safeCss(css.css);
        };

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
                    .update(css._id, css)
                    .then(function(doc) {
                        css = doc;
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            
            } else {
                
                self.DatabaseService
                    .insert(css)
                    .then(function(doc) {
                        self.availableCss.push(doc);
                        css = doc;
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }
        };

        self.deleteCss = function(css) {
            if (css._id) {
                self.PendingService.start();
                var indexCss = _.findIndex(self.availableCss,{_id:css._id});

                if (indexCss && indexCss >= 0) {
                    self.availableCss.splice(indexCss,1);
                }
                
                self.DatabaseService
                    .remove(css._id)
                    .then(function(numRemoved) {
                        console.log('removed',numRemoved);
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }
        };

        self.safeCss = function(css) {
            var objCss = cssParser.parse(css);
            console.log('objCss',objCss);

            var newRules = objCss.stylesheet.rules.map(function(rule) {
                var newRule = rule;
                if (rule.type === 'rule') {

                    var newSelectors = rule.selectors.map(function(selector) {
                        if (!selector.startsWith('.viewer')) {
                            return '.viewer ' + selector;
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