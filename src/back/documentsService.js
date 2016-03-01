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



    function DocumentsService(PreferencesService,$q) {
        console.log('DocumentsService');

        this.PreferencesService = PreferencesService;
        this.$q = $q;

        var self = this;


        self.getDocuments = function() {

            return self.$q(function(resolve,reject) {
                var db = self.PreferencesService.getDB();

                db.find({docName:'markdown'}, function (err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
            });
        };

        return self;


    }

}());