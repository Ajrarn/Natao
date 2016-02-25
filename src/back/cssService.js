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
    function CssService($translate) {
        console.log('CssService');

        this.$translate = $translate;

        var self = this;


        self.init = function(db,nameCss) {
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
        };

        self.addCss = function(newCss) {
             self.db.insert(newCss, function(err) {
                if (err) {
                    console.error(err);
                }
                 self.initCss();
             });
        };

        self.initCurrent = function(nameCss) {
            self.currentCss = _.find(self.availableCss,{name:nameCss});
        };

        return self;
    }

}());