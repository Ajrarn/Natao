(function () {
    "use strict";

    var fs = require('fs');

    // Load native UI library
    var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)

// Get the current window
    var win = gui.Window.get();

    var modules = ['ngSanitize','ng-showdown','ngRoute','pascalprecht.translate','tmh.dynamicLocale','treeControl','DWand.nw-fileDialog','nsPopover','uiSwitch','ui.ace'];

    angular
        .module('Natao', modules)
        .run(run);

    function run($rootScope,$timeout,PendingService) {
        console.log('run');

        //win.showDevTools();

        //prevent close
        win.on('close', function() {

            if (PendingService.pending > 0) {

                var _this = this;
                $rootScope.$watch(function(){
                    return PendingService.pending;
                },function() {
                    if (PendingService.pending === 0) {
                        _this.hide(); // Pretend to be closed already
                        _this.close(true);
                    }
                })

            } else {
                this.hide(); // Pretend to be closed already
                this.close(true);
            }
        });

        //Detect webkit and version
        if (typeof process !== "undefined") {
            $rootScope.nodeWebkitVersion = process.versions['node-webkit'];

            console.log($rootScope.nodeWebkitVersion);

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


    }
}());