(function () {
    "use strict";

    // Load native UI library
    var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)

    var modules = ['ngSanitize','pascalprecht.translate', 'tmh.dynamicLocale','ng-showdown'];

    angular
        .module('Natao', modules)
        .run(run);

    function run($rootScope) {

        //Detect webkit and version
        if (typeof process !== "undefined") {
            $rootScope.nodeWebkitVersion = process.versions['node-webkit'];

            if (process.platform === "darwin") {
                var mb = new gui.Menu({type: 'menubar'});
                mb.createMacBuiltin('Natao', {
                    hideEdit: false,
                });
                gui.Window.get().menu = mb;
            }

        } else {
            $rootScope.nodeWebkitVersion = 'browser';
        }
    }

}());