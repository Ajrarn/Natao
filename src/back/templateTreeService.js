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
    function TemplateTreeService() {
        console.log('TemplateTreeService');

        var self = this;
        self.availableTemplates = [];

        self.init = function(db) {
            self.db = db;
            self.db.find({docName:'template'},function(err,docs) {
                if (err) {
                    console.error(err);
                } else {
                    if (docs.length === 0) {
                        self.defaultCss();
                    } else {
                        self.availableTemplates = docs;
                        console.log('templates',self.availableTemplates);
                    }
                }
            });
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