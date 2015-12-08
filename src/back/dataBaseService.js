(function () {
    "use strict";

    var fs = require('fs')
        ,path = require('path')
        ,Datastore = require('nedb');

    angular
        .module('Natao')
        .service('DatabaseService', DatabaseService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }


    //Service itself
    function DatabaseService(SettingsService) {
        console.log('DatabaseService');

        var self = this;
        self.SettingsService = SettingsService;

        self.init = function() {
            console.log('databaseFile',self.SettingsService.settings.databaseFile);
            self.db = new Datastore({ filename: self.SettingsService.settings.databaseFile, autoload:true});
            console.log('db',self.db );
            var schoolLevel = {
                level:'6ème',
                subjects: {
                    subject: 'Français',
                    subSubject: ['Grammaire','Conjugaison','Orthographe']
                }
            }

            self.db .insert(schoolLevel, function(err,newDoc) {
                if (err) {
                    console.log(err);
                }
                schoolLevel = newDoc;
                console.log('schoolLevel',schoolLevel);
            });
        }

        return self;


    }

}());