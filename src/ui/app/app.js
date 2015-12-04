(function () {
    "use strict";

    var modules = ['ngSanitize','ng-showdown'];

    angular
        .module('Natao', modules)
        .run(run);

    function run($rootScope) {
        console.log('run');

        //Détecter si on est sur node-webkit, et quelle version.
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
    }
}());