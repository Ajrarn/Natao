(function () {
    "use strict";

    var fs = require('fs');

    var fileName = 'NataoSetting.json';

    var urlFirstSetting = '/firstTimeSettings';

    angular
        .module('Natao')
        .service('PreferencesService', PreferencesService)
        .run(run);

    //Start of the service
    function run() {
    }


    //Service itself
    function PreferencesService(DatabaseService,$location,$rootScope,$translate,tmhDynamicLocale) {
        console.log('PreferencesService');

        var self = this;
        self.DatabaseService = DatabaseService;
        self.$location = $location;
        self.$rootScope=$rootScope;
        self.$translate = $translate;
        self.tmhDynamicLocale = tmhDynamicLocale;




        self.fileSettingsExist = function() {
            return fs.existsSync(fileName);
        };



        self.fileDatabaseExist = function() {
            if (self.settings && self.settings.fileDatabase) {
                return fs.existsSync(self.settings.fileDatabase);
            } else {
                return false;
            }
        };

        /* only one preferences will be in NataoSettings, the path to find the database
        * the other preferences will be in the database
        * in the document {docName:'preferences'}
        */
        self.preferences = {
            docName:'Preferences',
            name: null,
            firstName: null,
            colorTheme: null,
            language: null,
            showDys: false,
            zoomLevel: 0,
            showMenu: true,
            showEditor: true,
            showVisualiser: true
        };




        self.saveFile = function() {
            fs.writeFile('NataoSetting.json',JSON.stringify(self.settings));
        };

        self.savePreferences = function() {
            if (self.preferences._id) {
                self.db.update({ _id: self.preferences._id }, self.preferences, {}, function (err) {
                    if (err) console.error('error:',err);
                });
            } else {
                self.db.insert(self.preferences, function (err, newDoc) {
                    if (err) {
                        console.error('error:',err);
                    } else {
                        self.preferences = newDoc;
                    }
                });
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
            valid = valid && self.preferences && self.preferences.language;
            valid = valid && self.preferences && self.preferences.zoomLevel !== null;
            valid = valid && self.preferences && self.preferences.showDys !== null;
            valid = valid && self.preferences && self.preferences.showMenu !== null;
            valid = valid && self.preferences && self.preferences.showEditor !== null;
            valid = valid && self.preferences && self.preferences.showVisualiser !== null;

            return valid;
        };




        self.save = function() {

            if(!self.fileSettingsExist()) {
                //the database is not yet connected
                self.db = self.DatabaseService.getDB(self.settings.fileDatabase);
            }

            self.saveFile();

            self.savePreferences();

        };

        self.zoomChange = function() {

            if ($rootScope.nodeWebkitVersion !== 'browser') {
                var gui = require('nw.gui');
                var win = gui.Window.get();
                win.zoomLevel = self.preferences.zoomLevel;
            }
        };

        self.getDB = function() {
           return self.db;
        };

        //This function use the language in the settings
        self.changeLanguage = function(language) {
            if (language){
                self.preferences.language = language;
            }
            self.$translate.use(self.preferences.language);
            self.tmhDynamicLocale.set(self.preferences.language.toLowerCase().replace('_','-'));
        };




        self.init = function() {

            //First we have to parse the json file and check if it exist
            if (self.fileSettingsExist()) {
                var data = fs.readFileSync(fileName,self.settings);
                try {
                    self.settings = JSON.parse(data);
                }
                catch (err) {
                    console.log('There has been an error parsing your JSON.');
                    console.log(err);
                    self.settings = {fileDatabase:null};
                    self.$location.path(urlFirstSetting);
                }
            } else {
                //When the user choose an existing database on setting page, his setting file isn't yet save but he has settings
                if (self.fileDatabaseExist()) {
                    self.saveFile();
                } else {
                    // here he doesn't have any settings
                    console.log('No setting file yet.');
                    self.settings = {fileDatabase:null};
                    self.$location.path(urlFirstSetting);
                }
            }

            //here the JSON is parsed successfully, we have to open the database to find the embeddable preferences
            if (self.fileDatabaseExist()) {
                self.db = self.DatabaseService.getDB(self.settings.fileDatabase);
                self.db.find({docName:'Preferences'}, function (err, docs) {
                    if (err) {
                        console.log('Document not found');
                        self.$location.path('/settings');
                    } else {
                        self.preferences = docs[0];
                        if (self.isValid()) {
                            // language settings
                            self.changeLanguage();

                            // and then go to the editor
                            self.$location.path('/editor');
                            self.zoomChange();
                            self.$rootScope.$digest();
                        } else {
                            self.$location.path(urlFirstSetting);
                        }
                    }
                });
            } else {
                self.settings.fileDatabase = null;
                self.$location.path(urlFirstSetting);
            }
        };


        return self;


    }

}());