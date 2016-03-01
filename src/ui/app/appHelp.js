(function () {
    "use strict";

    var fs = require('fs');

    var modules = ['ngSanitize','ng-showdown'];

    angular
        .module('Help', modules)
        .run(run);

    function run() {
        console.log('run');
    }

}());