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



    function DocumentsService(DatabaseService) {
        console.log('DocumentsService');

        var self = this;

        self.PreferencesService = PreferencesService;
        self.$q = $q;
        self.DatabaseService = DatabaseService;

        self.getDocuments = function() {
            return self.DatabaseService.find({docName:'markdown'});
        };

        return self;


    }

}());