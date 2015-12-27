(function () {
    "use strict";

    angular
        .module('Natao')
        .controller('SettingsController', SettingsController);


    function SettingsController(PreferencesService,DatabaseService,$location,$translate,$sce,fileDialog) {
        console.log('SettingsController');

        var self = this;

        self.PreferencesService = PreferencesService;
        self.$sce = $sce;
        self.DatabaseService = DatabaseService;

        self.firstTime = self.PreferencesService.fileExist();
        self.fileDialog = fileDialog;

        self.settingsValide = function() {
            self.valid = self.PreferencesService.isValid();
        };

        self.save = function() {
            self.PreferencesService.save();
            $location.path( '/app' );
        };

        self.changeLanguage = function () {
            $translate.use(self.PreferencesService.preferences.language);
            self.initMessage();
            self.settingsValide();
        };

        self.initMessage = function() {
            $translate('SETTING_MESSAGE').then(function (translation) {
                self.message = self.$sce.trustAsHtml(translation);
            });
        };

        self.newDatabase = function() {
            self.fileDialog.saveAs(function(filename) {
                self.PreferencesService.settings.fileDatabase = filename;
                console.log('fileDatabase',self.PreferencesService.settings.fileDatabase);
            },'Natao.db',['db']);
        };

        self.chooseDatabase = function() {
            self.fileDialog.openFile(function(filename){
                self.PreferencesService.settings.fileDatabase = filename;
            }, false, ['db']);
        };

        self.initMessage();
        self.settingsValide();




    }

}());