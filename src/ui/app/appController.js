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


    function AppController() {
        console.log('AppController');

        var self = this;
        self.databaseFile = '';

        self.changeFile = function(){
            console.log('file',self.databaseFile);
        }

    }

}());