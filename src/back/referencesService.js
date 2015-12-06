(function () {
    "use strict";

    angular
        .module('Natao')
        .service('ReferencesService', ReferencesService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }


    //Service itself
    function ReferencesService() {
        console.log('ReferencesService');

        var self = this;

        self.schoolSubject = [
            {
                subject: 'Français',
                subSubject: ['Grammaire','Conjugaison','Orthographe']
            },
            {
                subject: 'Mathématiques',
                subSubject: ['Algèbre','Géométrie']
            },
            {
                subject: 'Anglais'
            },
            {
                subject: 'Espagnol'
            }];

        self.schoolLevels = ['6ème','5ème','4ème','3ème','2nde','1ère','Terminale'];

        return self;


    }

}());