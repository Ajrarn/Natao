(function () {
    "use strict";

    var fs = require('fs');
    var nw = require('nw.gui');

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
        }]);


    function AppController($location,PreferencesService,CssService,$translate,$showdown,tmhDynamicLocale) {

        // For a good date translation
        $translate.onReady().then(function() {
            tmhDynamicLocale.set($translate.resolveClientLocale());
        });
        
        console.log('AppController');

        var self = this;
        self.$location = $location;
        self.databaseFile = '';
        self.showDys = false;
        self.PreferencesService = PreferencesService;
        self.CssService = CssService;
        self.$translate = $translate;
        self.$showdown = $showdown;
        self.$showdown.setOption('tables',true);
        self.$showdown.setOption('strikethrough',true);
        self.$showdown.setOption('tasklists',true);

        self.changeFile = function(){
            console.log('file',self.databaseFile);
        };

        self.help = function() {
            console.log(self.$translate.use());
            nw.Window.open('help.html?language=' + self.$translate.use() +',color=' + self.PreferencesService.preferences.colorTheme, {
                position: 'center',
                width: 1366,
                height: 768
            });
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
            if (self.PreferencesService.preferences.showEditor && !self.PreferencesService.preferences.showViewer) {
                self.toggleVisualiser();
            }
            self.PreferencesService.preferences.showEditor = !self.PreferencesService.preferences.showEditor;
            self.PreferencesService.savePreferences();
        };

        self.toggleViewer = function() {
            if (self.PreferencesService.preferences.showViewer && !self.PreferencesService.preferences.showEditor) {
                self.toggleEditor();
            }
            if (!self.PreferencesService.preferences.showViewer) {
                self.PreferencesService.preferences.showViewer = false;
            }
            self.PreferencesService.preferences.showViewer = !self.PreferencesService.preferences.showViewer;
            self.PreferencesService.savePreferences();
        };


        self.goSettings = function() {
            self.$location.path( '/settings' );
        };

        self.goApp = function() {
            self.$location.path( '/editor' );
        };

        self.PreferencesService.init();

    }

}());