(function () {
    "use strict";

    var _ = require('lodash')
        ,fs = require('fs');


    angular
        .module('Natao')
        .service('TemplateTreeService', TemplateTreeService)
        .run(run);

    //Start of the service
    function run() {
    }


    //Service itself
    function TemplateTreeService($translate,$q,CssService,DatabaseService,AppStateService) {
        var self = this;

        self.$translate = $translate;
        self.$q = $q;
        self.CssService = CssService;
        self.availableTemplates = [];
        self.DatabaseService = DatabaseService;
        self.AppStateService = AppStateService;


        self.getInitTemplate = function() {

            return self.$q(function (resolve, reject) {
                
                self.DatabaseService
                    .find({docName:'template'})
                    .then(function(docs) {
                        if (docs.length === 0) {
                            var templateFile = fs.readFileSync('./languages/templates-' + self.$translate.use() + '.json','utf8');

                            var templates = [];

                            if (templateFile) {
                                try {
                                    templates = JSON.parse(templateFile);

                                    var nbTemplatesPending = templates.length;

                                    templates.forEach(function(template) {
                                        template.docName = 'template';
                                        self.adaptCssTemplate(template);

                                        self.DatabaseService
                                            .save(template)
                                            .then(function(doc) {
                                                self.availableTemplates.push(doc);
                                                nbTemplatesPending--;
                                                if (nbTemplatesPending === 0) {
                                                    resolve();
                                                }
                                            })
                                            .catch(function(err) {
                                                reject(err);
                                            });
                                    });
                                }
                                catch (err) {
                                    reject(err);
                                }

                            }
                        } else {
                            self.availableTemplates = docs;
                            resolve();
                        }
                    })
                    .catch(function(err) {
                        reject(err);
                    });    
            });
        };

        self.adaptCssTemplate = function(node) {
            node.defaultCss = self.CssService.findCssId(node.defaultCss);
            if (node.children && node.children.length > 0) {
                node.children.forEach(function(item) {
                    self.adaptCssTemplate(item);
                });
            }
        };


        self.deleteDocReference = function(node) {
            if (node.children && node.children.length > 0) {

                _.remove(node.children,function(item) {
                    return item.leaf;
                });

                if (node.children.length > 0) {
                    node.children.forEach(function(item) {
                        self.deleteDocReference(item);
                    });
                }
            }
        };

        self.saveTemplate = function(node,nameTemplate) {
            var template = {};
            //first we copy the node
            angular.copy(node,template);
            //then delete the document reference from the copy
            self.deleteDocReference(template);
            delete template._id;
            
            //we search if the template already exist
            var oldTemplate = self.getTemplate(nameTemplate);
            if (oldTemplate) {

                oldTemplate.children = template.children;

                self.DatabaseService
                    .save(oldTemplate)
                    .then(function(doc) {
                        oldTemplate = doc;
                    })
                    .catch(function(err) {
                        console.error(err);
                    });

            } else {
                //We insert the new template
                //customize it the find in the template collection
                template.docName = 'template';
                template.name = nameTemplate;
                delete template.id;

                //and finally save it in the database

                self.DatabaseService
                    .save(template)
                    .then(function(doc) {
                        self.availableTemplates.push(doc);
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
                
            }

        };

        self.getTemplate = function(name) {
            return _.find(self.availableTemplates,{name:name});
        };

        self.deleteTemplate = function(template) {
            if (template._id) {
                self.AppStateService.startWrite();
                var indexTemplate = _.findIndex(self.availableTemplates,{_id:template._id});

                if (indexTemplate && indexTemplate >= 0) {
                    self.availableTemplates.splice(indexTemplate,1);
                }

                self.DatabaseService
                    .delete(template._id)
                    .then(function(numRemoved) {
                        self.AppStateService.stopWrite();
                    })
                    .catch(function(err) {
                        self.AppStateService.stopWrite();
                        console.error(err);
                    });
            }
        };

        return self;
    }

}());