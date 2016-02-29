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


        /*self.init = function(db,nameCss) {
            self.db = db;
            self.initCss(nameCss);

            //First we load the names of the css in the appropriate language
            self.cssNamesFile = fs.readFileSync('./translations/cssNames-' + self.$translate.use() + '.json','utf8');
            self.cssNames = {};

            try {
                self.cssNames = JSON.parse(self.cssNamesFile);
            }
            catch (err) {
                console.log('There has been an error parsing your JSON.');
                console.log(err);
            }
            console.log('cssNames',self.cssNames);
        };

        self.initCss = function(nameCss) {
             self.db.find({docName:'css'},function(err,docs) {
                 if (err) {
                     console.error(err);
                 } else {
                     if (docs.length === 0) {
                         self.defaultCss();
                     } else {
                         self.availableCss = docs;
                         console.log('css',docs);
                         if (nameCss) {
                             self.initCurrent(nameCss);
                         }
                     }
                 }
             });
        };

        self.defaultCss = function() {
            var pathCss = './default_css';
            self.availableCss = [];

            if (self.cssNames) {
                var defaultFilesCss = fs.readdirSync(pathCss);


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
                            console.error(err);
                        } else {
                            self.availableCss.push(doc);
                        }
                    });
                });
            }
        };*/

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
                 self.initCss();
             });
        };

        self.initCurrentById = function(idCss) {
            var css = _.find(self.availableCss,{_id:idCss});
            self.currentCss = css.css;
        };

        self.initCurrentByContent = function(css) {
            self.currentCss = css;
        };

        return self;
    }

}());