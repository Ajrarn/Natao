(function () {
    "use strict";

    angular
        .module('Natao')
        .service('DocumentsService', DocumentsService)
        .run(run);

    //Start of the service
    function run() {
    }



    function DocumentsService(DatabaseService,AppStateService,$q) {

        var self = this;
        self.DatabaseService = DatabaseService;
        self.AppStateService = AppStateService;
        self.$q = $q;

        self.getDocuments = function() {
            return self.DatabaseService.find({docName:'markdown'});
        };
        
        self.findDocument = function(id) {
            return self.DatabaseService.find({docName:'markdown',_id: id});
        };

        
        //Create new markdown with defaultCss, title and markdown
        self.addDocument = function(defaultCss,title,markdown) {
            
            return self.$q(function(resolve,reject) {
                
                var newMarkDown = {
                    docName: 'markdown',
                    title: title,
                    created: new Date(),
                    css: defaultCss,
                    md: ''
                };

                if (markdown) {
                    newMarkDown.md = markdown;
                }

                self.AppStateService.startWrite();
                self.DatabaseService
                    .save(newMarkDown)
                    .then(function(newDoc) {
                        self.AppStateService.stopWrite();
                        resolve(newDoc);
                    })
                    .catch(function(err) {
                        self.AppStateService.stopWrite();
                        reject(err);
                    });
            });
        };
        
        self.updateDocument = function(docSource) {
            return self.$q(function(resolve,reject) {
                
                self.AppStateService.startWrite();
                
                self.DatabaseService
                    .save(docSource)
                    .then(function(doc) {
                        self.AppStateService.stopWrite();
                        resolve(doc);
                    })
                    .catch(function(err) {
                        self.AppStateService.stopWrite();
                        reject(err);
                    });
            });
        };

        self.insertDocument = function(docSource) {
            return self.$q(function(resolve,reject) {

                self.AppStateService.startWrite();

                self.DatabaseService
                    .save(docSource)
                    .then(function(doc) {
                        self.AppStateService.stopWrite();
                        resolve(doc);
                    })
                    .catch(function(err) {
                        self.AppStateService.stopWrite();
                        reject(err);
                    });
            });
        };

        //delete of a document
        self.deleteDocument = function(id) {
            
            return self.$q(function(resolve,reject) {
                self.AppStateService.startWrite();

                self.DatabaseService
                    .delete(id)
                    .then(function(numRemoved) {
                        self.AppStateService.stopWrite();
                        resolve(numRemoved);
                    })
                    .catch(function(err) {
                        self.AppStateService.stopWrite();
                        reject(err);
                    });
            });
   
        };

        return self;


    }

}());