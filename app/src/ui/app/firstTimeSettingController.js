(function () {
    "use strict";

    var fs = require('fs');

    angular
        .module('Natao')
        .controller('FirstTimeSettingsController', FirstTimeSettingsController);


    function FirstTimeSettingsController($rootScope,$scope,PreferencesService,DatabaseService,$location,$translate,$sce,fileDialog) {
        console.log('FirstTimeSettingsController');

        var self = this;

        self.PreferencesService = PreferencesService;
        self.$sce = $sce;
        self.DatabaseService = DatabaseService;
        self.$scope = $scope;

        self.fileDialog = fileDialog;

        // for the first time, we have to go step by step
        if (!self.PreferencesService.settings.fileDatabase) {
            self.step = 1;
        } else {
            self.step = 5;
        }

        // The only way to the good message with asynchroneous loading of translation
        $rootScope.$on('$translateChangeSuccess', function () {
            self.message = $translate.instant('SETTING_MESSAGE');
        });


        self.settingsValide = function() {
            self.valid = self.PreferencesService.isValid();
            if (self.valid) {
                self.save();
            }
        };

        self.changeName = function() {
            self.settingsValide();
            if (self.PreferencesService.preferences.name && self.PreferencesService.preferences.firstName && self.PreferencesService.preferences.className
                && self.PreferencesService.preferences.name !== '' && self.PreferencesService.preferences.firstName !== '' && self.PreferencesService.preferences.className !== '') {
                self.step = 4;
            }
        };

        self.save = function() {
            self.PreferencesService.save();
            $location.path( '/loading' );
        };

        self.changeLanguage = function(language) {
            self.PreferencesService.changeLanguage(language);
            self.settingsValide();
            self.step = 2;
        };


        self.newDatabase = function() {
            self.fileDialog.saveAs(function(filename) {
                self.PreferencesService.settings.fileDatabase = filename;
                if (fs.existsSync(filename)) {
                    fs.unlinkSync(filename);
                }
                self.step = 3;
                self.$scope.$apply();
            },'Natao.db',['db']);
        };

        self.chooseDatabase = function() {
            self.fileDialog.openFile(function(filename){
                self.PreferencesService.settings.fileDatabase = filename;
                self.PreferencesService.saveSettings();
                self.PreferencesService.init();
            }, false, ['db']);
        };

        self.showMessage = function() {
            return (self.step > 1)
        };

        self.showFile = function() {
            return (self.step > 1)
        };

        self.showId = function() {
            return (self.step > 2)
        };

        self.showColor = function() {
            return (self.step > 3)
        };

        self.showDone = function() {
            return (self.step > 3 && self.valid)
        };

        self.settingsValide();

    }

}());