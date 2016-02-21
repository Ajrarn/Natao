(function () {
    "use strict";

    var fs = require('fs');

    var modules = ['ngSanitize','ng-showdown','ngRoute','pascalprecht.translate','tmh.dynamicLocale','treeControl','DWand.nw-fileDialog','nsPopover'];

    angular
        .module('Natao', modules)
        .directive('focusOn', function() {
            return function(scope, elem, attr) {
                scope.$on('focusOn', function(e, name) {
                    if(name === attr.focusOn) {
                        elem[0].focus();
                    }
                });
            };
        })
        .factory('focus', function ($rootScope, $timeout) {
            return function(name) {
                $timeout(function (){
                    $rootScope.$broadcast('focusOn', name);
                });
            }
        })
        .run(run);

    function run($rootScope,$location,PreferencesService) {
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


    }
}());