(function () {
    "use strict";

    var fs = require('fs');
    var fileName = 'NataoSetting.json';
    var urlFirstSetting = '/firstTimeSettings';
    var gui = require('nw.gui');


    angular
        .module('Natao')
        .service('PreferencesService', PreferencesService)
        .run(run);

    //Start of the service
    function run() {
    }


    //Service itself
    function PreferencesService(DatabaseService,$location,$rootScope,$translate) {

        var self = this;
        self.DatabaseService = DatabaseService;
        self.$location = $location;
        self.$rootScope=$rootScope;
        self.$translate = $translate;


        self.fileDatabaseExist = function() {
            if (self.settings && self.settings.fileDatabase) {
                return fs.existsSync(self.settings.fileDatabase);
            } else {
                return false;
            }
        };

        /* only one preferences will be in the localStorage, the path to find the database
        * the other preferences will be in the database
        * in the document {docName:'preferences'}
        */
        self.preferences = {
            docName:'Preferences',
            name: null,
            firstName: null,
            colorTheme: null,
            showDys: false,
            zoomLevel: 0,
            showMenu: true,
            showEditor: true,
            showViewer: true,
            showTours:false,
            toursSeen:[]
        };

       self.saveSettings = function() {
           localStorage.setItem('nataoFileDatabase',self.settings.fileDatabase);
           self.DatabaseService.setDB(self.settings.fileDatabase);
       };

        self.savePreferences = function() {
            if (self.preferences._id) {
                return self.DatabaseService.update(self.preferences._id,self.preferences);
            } else {
                return self.DatabaseService.insert(self.preferences);
            }
        };

        /*
         Check if the preferences/settings are valid
         */
        self.isValid = function() {
            var valid = self.settings && self.settings.fileDatabase;
            valid = valid && self.preferences && self.preferences.name;
            valid = valid && self.preferences && self.preferences.firstName;
            valid = valid && self.preferences && self.preferences.colorTheme;
            valid = valid && self.preferences && self.preferences.zoomLevel !== null;
            valid = valid && self.preferences && self.preferences.showDys !== null;
            valid = valid && self.preferences && self.preferences.showMenu !== null;
            valid = valid && self.preferences && self.preferences.showEditor !== null;
            valid = valid && self.preferences && self.preferences.showViewer !== null;

            return valid;
        };




        self.save = function() {
            self.saveSettings();
            
            return self.savePreferences();
        };

        self.zoomChange = function() {

            if ($rootScope.nodeWebkitVersion !== 'browser') {
                var win = gui.Window.get();
                win.zoomLevel = self.preferences.zoomLevel;
            }
        };
        
        self.init = function() {

            //First we have to parse the json file and check if it exist
            self.settings = {};
            self.settings.fileDatabase = localStorage.getItem('nataoFileDatabase');

            if (!self.settings.fileDatabase) {
                self.$location.path(urlFirstSetting);
            } else {
                if (self.fileDatabaseExist()) {
                    self.DatabaseService.setDB(self.settings.fileDatabase);
                    
                    self.DatabaseService
                        .find({docName:'Preferences'})
                        .then(function(docs) {
                            self.preferences = docs[0];
                            if (self.isValid()) {
                                // and then go to the editor
                                self.$location.path('/loading');
                                self.zoomChange();
                            } else {
                                self.$location.path(urlFirstSetting);
                            }
                        })
                        .catch(function() {
                            console.error('Document not found');
                            self.$location.path('/settings');
                    });
                    
                } else {
                    self.settings.fileDatabase = null;
                    self.$location.path(urlFirstSetting);
                }
            }
        };
        
        return self;
        
    }

}());