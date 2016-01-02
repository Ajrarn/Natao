(function () {
    "use strict";

    var fs = require('fs');

    const fileName = 'NataoSetting.json';

    angular
        .module('Natao')
        .service('PreferencesService', PreferencesService)
        .run(run);

    //Start of the service
    function run() {
    }


    //Service itself
    function PreferencesService(DatabaseService,$location) {
        console.log('PreferencesService');

        var self = this;
        self.DatabaseService = DatabaseService;
        self.$location = $location;

        self.fileExist = function() {
            return fs.existsSync(fileName);
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
            language: null
        };

        self.saveFile = function() {
            fs.writeFile('NataoSetting.json',JSON.stringify(self.settings));
        };


        self.init = function() {




            if (self.fileExist() && (!self.settings || (self.settings && !self.settings.fileDatabase))) {
                var data = fs.readFileSync(fileName,self.settings);
                try {
                    self.settings = JSON.parse(data);
                }
                catch (err) {
                    console.log('There has been an error parsing your JSON.');
                    console.log(err);
                    self.settings = {fileDatabase:null};
                    self.$location.path('/settings');
                }
            } else {
                //When the user choose an existing database on setting page, his setting file isn't yet save but he has settings
                if (self.settings && self.settings.fileDatabase) {
                    self.saveFile();
                } else {
                    // here he doesn't have any settings
                    console.log('No setting file yet.');
                    self.settings = {fileDatabase:null};
                    self.$location.path('/settings');
                }
            }

            if (self.settings.fileDatabase) {
                self.db = self.DatabaseService.getDB(self.settings.fileDatabase);
                self.db.find({docName:'Preferences'}, function (err, docs) {
                    if (err) {
                        console.log('Document not found');
                        self.$location.path('/settings');
                    } else {
                        self.preferences = docs[0];
                        console.log(self.preferences);
                        self.$location.path('/app');
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

            return valid;
        };


        self.save = function() {

            if(!self.fileExist()) {
                //the database is not yet connected
                self.db = self.DatabaseService.getDB(self.settings.fileDatabase);
            }

            self.saveFile();

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
                        console.log(newDoc);
                    }
                });
            }

        };

        return self;


    }

}());