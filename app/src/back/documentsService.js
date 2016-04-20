(function () {
    "use strict";

    angular
        .module('Natao')
        .service('DocumentsService', DocumentsService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }



    function DocumentsService(DatabaseService,PendingService,$q) {
        console.log('DocumentsService');

        var self = this;
        self.DatabaseService = DatabaseService;
        self.PendingService = PendingService;
        self.$q = $q;

        self.getDocuments = function() {
            return self.DatabaseService.find({docName:'markdown'});
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

                self.PendingService.start();
                self.DatabaseService
                    .insert(newMarkDown)
                    .then(function(newDoc) {
                        self.PendingService.stop();
                        resolve(newDoc);
                    })
                    .catch(function(err) {
                        self.PendingService.stop();
                        reject(err);
                    });
            });
        };
        
        self.updateDocument = function(docSource) {
            return self.$q(function(resolve,reject) {
                
                self.PendingService.start();
                
                self.DatabaseService
                    .update(docSource._id,docSource)
                    .then(function(doc) {
                        self.PendingService.stop();
                        resolve(doc);
                    })
                    .catch(function(err) {
                        self.PendingService.stop();
                        reject(err);
                    });
            });
        };

        return self;


    }

}());