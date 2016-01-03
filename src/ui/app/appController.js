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

        //This toggle is at a higher level, so everything will be concerned by the dyslexic font
        self.toggleDys = function() {
            self.PreferencesService.preferences.showDys = !self.PreferencesService.preferences.showDys;
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