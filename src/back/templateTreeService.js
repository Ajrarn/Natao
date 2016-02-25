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
        console.log('run');
    }


    //Service itself
    function TemplateTreeService($translate) {
        console.log('TemplateTreeService');
        this.$translate = $translate;

        var self = this;
        self.availableTemplates = [];

        self.init = function(db) {
            self.db = db;
            self.db.find({docName:'template'},function(err,docs) {
                if (err) {
                    console.error(err);
                } else {
                    if (docs.length === 0) {
                        self.defaultTemplate();
                    } else {
                        self.availableTemplates = docs;
                        console.log('templates',self.availableTemplates);
                    }
                }
            });
        };

        self.defaultTemplate = function() {
            //First we load the names of the css in the appropriate language
            var templateFile = fs.readFileSync('./translations/templates-' + self.$translate.use() + '.json','utf8');

            var templates = [];

            if (templateFile) {
                try {
                    templates = JSON.parse(templateFile);

                    templates.forEach(function(template) {
                        self.saveTemplate(template,template.name);
                    });
                }
                catch (err) {
                    console.log('There has been an error parsing your JSON.');
                    console.log(err);
                }

            }
        };

        self.deleteDocReference = function(node) {
            if (node.children && node.children.length > 0) {
                node.children.forEach(function(item) {
                    if (item.leaf) {
                        node.children.splice(_.findIndex(node.children,{id:item.id}),1);
                    } else {
                        self.deleteDocReference(item);
                    }
                });
            }
        };

        self.saveTemplate = function(node,nameTemplate) {
            var template = {};
            //first we copy the node
            angular.copy(node,template);
            //then delete the document reference from the copy
            self.deleteDocReference(node);

            //we search if the template already exist
            var oldTemplate = self.getTemplate(nameTemplate);
            if (oldTemplate) {

                oldTemplate.children = template.children;

                self.db.update({_id: oldTemplate._id }, oldTemplate, {}, function (err) {
                    if (err){
                        console.error(err);
                    }
                });

            } else {
                //We insert the new template
                //customize it the find in the template collection
                template.docName = 'template';
                template.name = nameTemplate;
                delete template.id;

                //and finally save it in the database
                self.db.insert(template, function (err,doc) {
                    if (err) {
                        console.error(err);
                    } else {
                        self.availableTemplates.push(doc);
                    }
                });
            }

        };

        self.getTemplate = function(name) {
            return _.find(self.availableTemplates,{name:name});
        };

        return self;
    }

}());