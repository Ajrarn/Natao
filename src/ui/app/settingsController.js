(function () {
    "use strict";

    angular
        .module('Natao')
        .controller('SettingsController', SettingsController);


    function SettingsController(SettingsService,$location) {
        console.log('SettingsController');

        var self = this;
        self.directory = null;
        self.SettingsService = SettingsService;

        self.save = function() {
            console.log('directory',self.directory);
            if (self.directory) {
                self.SettingsService.setPathFile(self.directory.path);
            }
            self.SettingsService.save();
            $location.path( '/app' );
        };


    }

}());