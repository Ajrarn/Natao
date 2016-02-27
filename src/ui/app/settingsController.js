(function () {
    "use strict";

    angular
        .module('Natao')
        .controller('SettingsController', SettingsController);


    function SettingsController($rootScope,$scope,PreferencesService,DatabaseService,$location,$sce,fileDialog,CssService) {
        console.log('SettingsController');

        var self = this;

        self.PreferencesService = PreferencesService;
        self.$sce = $sce;
        self.DatabaseService = DatabaseService;
        self.$scope = $scope;

        self.fileDialog = fileDialog;
        self.CssService = CssService;

        self.settingsValide = function() {
            self.valid = self.PreferencesService.isValid();
        };

        self.changeName = function() {
            self.settingsValide();
            if (self.PreferencesService.preferences.name && self.PreferencesService.preferences.firstName && self.PreferencesService.preferences.name !== '' && self.PreferencesService.preferences.firstName !== '') {
                self.step = 4;
            }
        };

        self.save = function() {
            self.PreferencesService.save();
            $location.path( '/app' );
        };

        self.changeLanguage = function(language) {
            self.PreferencesService.changeLanguage(language);
            self.settingsValide();
            self.step = 2;
        };


        self.newDatabase = function() {
            self.fileDialog.saveAs(function(filename) {
                self.PreferencesService.settings.fileDatabase = filename;
                console.log('fileDatabase',self.PreferencesService.settings.fileDatabase);
                self.step = 3;
                self.$scope.$apply();
            },'Natao.db',['db']);
        };

        self.chooseDatabase = function() {
            self.fileDialog.openFile(function(filename){
                self.PreferencesService.settings.fileDatabase = filename;
                self.PreferencesService.init();
                self.$scope.$apply();
            }, false, ['db']);

        };

        self.saveCss = function() {
            console.log('save Css');
        };


        self.settingsValide();

    }

}());