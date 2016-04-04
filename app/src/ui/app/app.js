(function () {
    "use strict";

    var fs = require('fs');

    // Load native UI library
    var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)

// Get the current window
    var win = gui.Window.get();

    var modules = ['ngSanitize', 'ng-showdown', 'ngRoute', 'pascalprecht.translate', 'tmh.dynamicLocale', 'treeControl', 'DWand.nw-fileDialog', 'nsPopover', 'uiSwitch','ngjsColorPicker','ui.codemirror'];

    angular
        .module('Natao', modules)
        .run(run);

    function run($rootScope, $timeout, PendingService,PrincipalTreeService) {
        console.log('run');

        //prevent properly close
        win.on('close', function () {

            PrincipalTreeService.clearBuffer();

            if (PendingService.pending > 0) {

                var _this = this;
                $rootScope.$watch(function () {
                    return PendingService.pending;
                }, function () {
                    if (PendingService.pending === 0) {
                        win.hide(); // Pretend to be closed already
                        win.close(true);
                    }
                })

            } else {
                win.hide(); // Pretend to be closed already
                win.close(true);
            }
        });

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