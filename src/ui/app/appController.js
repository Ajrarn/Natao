(function () {
    "use strict";

    var fs = require('fs');

    angular
        .module('Natao')
        .controller('AppController', AppController)
        .directive("fileread", [function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        scope.$apply(function () {
                            scope.fileread = changeEvent.target.files[0];
                            // or all selected files:
                            // scope.fileread = changeEvent.target.files;
                        });
                    });
                }
            }
        }]);;


    function AppController($location,PreferencesService) {
        console.log('AppController');

        var self = this;
        self.$location = $location;
        self.databaseFile = '';
        self.showDys = false;
        self.PreferencesService = PreferencesService;

        self.changeFile = function(){
            console.log('file',self.databaseFile);
        };


        self.toggleDys = function() {
            self.PreferencesService.preferences.showDys = !self.PreferencesService.preferences.showDys;
            self.PreferencesService.savePreferences();
        };

        self.zoomHigher = function() {
            self.PreferencesService.preferences.zoomLevel++;
            self.PreferencesService.savePreferences();
            self.PreferencesService.zoomChange();
        };

        self.zoomLower = function() {
            self.PreferencesService.preferences.zoomLevel--;
            self.PreferencesService.savePreferences();
            self.PreferencesService.zoomChange();
        };

        self.toggleMenu = function() {
            self.PreferencesService.preferences.showMenu = !self.PreferencesService.preferences.showMenu;
            self.PreferencesService.savePreferences();
        };

        self.toggleEditor = function() {
            if (self.PreferencesService.preferences.showEditor && !self.PreferencesService.preferences.showVisualiser) {
                self.toggleVisualiser();
            }
            self.PreferencesService.preferences.showEditor = !self.PreferencesService.preferences.showEditor;
            self.PreferencesService.savePreferences();
        };

        self.toggleVisualiser = function() {
            if (self.PreferencesService.preferences.showVisualiser && !self.PreferencesService.preferences.showEditor) {
                self.toggleEditor();
            }
            self.PreferencesService.preferences.showVisualiser = !self.PreferencesService.preferences.showVisualiser;
            self.PreferencesService.savePreferences();
        };


        self.goSettings = function() {
            self.$location.path( '/settings' );
        };

        self.goApp = function() {
            self.$location.path( '/app' );
        };

        self.PreferencesService.init();

    }

}());