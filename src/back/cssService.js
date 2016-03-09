(function () {
    "use strict";

    var _ = require('lodash')
        ,fs = require('fs');


    angular
        .module('Natao')
        .service('CssService', CssService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }


    //Service itself
    function CssService($translate,$q) {
        console.log('CssService');

        this.$translate = $translate;
        this.$q = $q;

        var self = this;

        self.getInitCss = function(db) {
            self.db = db;

            return self.$q(function(resolve,reject) {


                //First we load the names of the css in the appropriate language
                self.cssNamesFile = fs.readFileSync('./translations/cssNames-' + self.$translate.use() + '.json','utf8');
                self.cssNames = {};

                var defaultCss = null;

                try {
                    self.cssNames = JSON.parse(self.cssNamesFile);
                }
                catch (err) {
                    reject(err);
                }

                //Then we search for existing css documents
                self.db.find({docName:'css'},function(err,docs) {
                    if (err) {
                        reject(err);
                    } else {
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

                                self.db.insert(docCss,function(err,doc) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        self.availableCss.push(doc);
                                        nbfilesPending--;
                                        if (nbfilesPending === 0) {
                                            defaultCss = _.find(self.availableCss,{default:true});
                                            resolve(defaultCss);
                                        }
                                    }
                                });
                            });

                        } else {
                            self.availableCss = docs;
                            defaultCss = _.find(self.availableCss,{default:true});
                            resolve(defaultCss);
                        }
                    }
                });
            });
        };

        self.addCss = function(newCss) {
             self.db.insert(newCss, function(err) {
                if (err) {
                    console.error(err);
                }
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
                self.db.insert(docCss, function(err,doc) {
                    if (err) {
                        reject(err);
                    } else {
                        self.availableCss.push(doc);
                        resolve(doc);
                    }
                });
            });

        };

        self.initCurrentById = function(idCss) {
            var css = _.find(self.availableCss,{_id:idCss});
            self.currentCss = css.css;
        };

        self.initCurrentByContent = function(css) {
            self.currentCss = css;
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
                var copyCurrent = {};
                angular.copy(css,copyCurrent);
                self.db.update({_id: css._id }, copyCurrent, {}, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            } else {
                self.db.insert(css,function(err,doc) {
                    if (err) {
                        reject(err);
                    } else {
                        self.availableCss.push(doc);
                        css = doc;
                    }
                });
            }


        };

        return self;
    }

}());