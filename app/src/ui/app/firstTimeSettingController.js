(function () {
    "use strict";

    var fs = require('fs');

    angular
        .module('Natao')
        .controller('FirstTimeSettingsController', FirstTimeSettingsController);


    function FirstTimeSettingsController($rootScope,$scope,PreferencesService,DatabaseService,$location,$translate,$sce,fileDialog) {
        
        var self = this;

        self.PreferencesService = PreferencesService;
        self.$sce = $sce;
        self.DatabaseService = DatabaseService;
        self.$scope = $scope;

        self.fileDialog = fileDialog;
        
        self.step = 1;

        $translate('SETTING_MESSAGE').then(function (translation) {
            self.welcomeMessage = translation;
        });

        $translate('SETTING_MESSAGE_DATABASE').then(function (translation) {
            self.databaseMessage = translation;
        });

        $translate('SETTING_MESSAGE_NAME').then(function (translation) {
            self.identityMessage = translation;
        });
        

        self.settingsValide = function() {
            if (self.PreferencesService.isValid()) {
                self.save();
            }
        };

        self.changeName = function() {
            self.settingsValide();
            if (self.PreferencesService.preferences.name && self.PreferencesService.preferences.firstName && self.PreferencesService.preferences.className
                && self.PreferencesService.preferences.name !== '' && self.PreferencesService.preferences.firstName !== '' && self.PreferencesService.preferences.className !== '') {
                self.step = 3;
            }
        };

        self.save = function() {
            self.PreferencesService
                .save()
                .then(function() {
                    $location.path( '/loading' );
                })
                .catch(function(err) {
                    console.error(err);
                });
            
        };
        
        
        self.newDatabase = function() {
            self.fileDialog.saveAs(function(filename) {
                self.PreferencesService.settings.fileDatabase = filename;
                if (fs.existsSync(filename)) {
                    fs.unlinkSync(filename);
                }
                self.step = 2;
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
            return (self.step > 0)
        };

        self.showFile = function() {
            return (self.step > 0)
        };

        self.showId = function() {
            return (self.step > 1)
        };

        self.showColor = function() {
            return (self.step > 2)
        };

        self.settingsValide();

    }

}());