(function () {
    "use strict";

    var fs = require('fs');

    var modules = ['ngSanitize','ng-showdown','ngRoute'];

    angular
        .module('Natao', modules)
        .run(run);

    function run($rootScope,$location,SettingsService) {
        console.log('run');

        //Detect webkit and version
        if (typeof process !== "undefined") {
            $rootScope.nodeWebkitVersion = process.versions['node-webkit'];

            var gui = require('nw.gui');
            if (process.platform === "darwin") {
                var mb = new gui.Menu({type: 'menubar'});
                mb.createMacBuiltin('Natao', {
                    hideEdit: false,
                });
                gui.Window.get().menu = mb;
            }

        }else{
            $rootScope.nodeWebkitVersion = 'browser';
        }

        //detect config file
        if (!SettingsService.fileExist()) {
            $location.path( '/settings' );
        } else {
            SettingsService.init();
        }
    }
}());