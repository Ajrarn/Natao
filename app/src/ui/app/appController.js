(function () {
    "use strict";

    var fs = require('fs');
    var nw = require('nw.gui');
    var uuid = require('node-uuid');
    var sha512 = require('crypto-js/sha512');

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


    function AppController($location,PreferencesService,CssService,$translate,$showdown,tmhDynamicLocale,ColorPickerService) {

        // For a good date translation
        $translate.onReady().then(function() {
            var locale = $translate.proposedLanguage().replace('_','-').toLowerCase();
            if (locale === 'fr') {
                locale = 'fr-fr';
            }
            tmhDynamicLocale.set(locale);
        });

        var self = this;
        self.$location = $location;
        self.databaseFile = '';
        self.showDys = false;
        self.PreferencesService = PreferencesService;
        self.CssService = CssService;
        self.$translate = $translate;
        self.$showdown = $showdown;
        self.ColorPickerService = ColorPickerService;
        self.$showdown.setOption('tables',true);
        self.$showdown.setOption('strikethrough',true);
        self.$showdown.setOption('tasklists',true);
        self.isLocked = false;
        self.validPassword = false;


        self.help = function() {
            nw.Window.open('help.html?language=' + self.$translate.use()
                + '&theme=' + self.PreferencesService.preferences.colorTheme
                + '&showDys=' + self.PreferencesService.preferences.showDys, {
                position: 'center',
                width: 1366,
                height: 768
            });
        };

        self.print = function(docId) {
            nw.Window.open('print.html?language=' + self.$translate.use() + '&docId=' + docId + '&showDys=' + self.PreferencesService.preferences.showDys, {
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
                self.toggleViewer();
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




        // ************************ Lock ********************

        self.checkStorePassword = function() {
            var hashPassword = localStorage.getItem('password');
            if (hashPassword) {
                self.PreferencesService.preferences.showMenu = false;
                self.isLocked = true;
            }
        };

        self.storePassword = function() {
            var salt = uuid.v4();
            var hashPassword = sha512(self.password + salt).toString();

            localStorage.setItem('password',hashPassword);
            localStorage.setItem('salt',salt);
        };

        self.unstorePassword = function() {
            localStorage.removeItem('password');
            localStorage.removeItem('salt');
        };

        self.checkHashPassword = function() {
            var salt = localStorage.getItem('salt');
            var hashPassword = sha512(self.unlockPassword + salt).toString();

            return hashPassword === localStorage.getItem('password');
        };


        self.lock = function(hide) {
            self.PreferencesService.preferences.previousShowMenu = self.PreferencesService.preferences.showMenu;
            self.PreferencesService.preferences.showMenu = false;
            self.PreferencesService.savePreferences();
            self.isLocked = true;
            self.storePassword();
            self.password = null;
            self.confirmation = null;
            hide();
        };




        self.unlock = function(hide) {

            if (self.forceUnlock || self.checkHashPassword()) {
                if (self.PreferencesService.preferences.previousShowMenu !== null) {
                    self.PreferencesService.preferences.showMenu = self.PreferencesService.preferences.previousShowMenu;
                    self.PreferencesService.preferences.previousShowMenu = null;
                    self.PreferencesService.savePreferences();
                }
                self.isLocked = false;
                self.unstorePassword();
                self.unlockPassword = null;
                self.forceUnlock = false;
            }
            hide();
        };


        self.validationPassword = function() {
            if (self.password && self.password.length > 0 && self.confirmation && self.confirmation.length >0) {
                self.validPassword = self.password === self.confirmation;
            } else {
                self.validPassword = false;
            }
        };

        /* ************************ init ************************* */
        self.PreferencesService.init();
        self.checkStorePassword();

    }

}());