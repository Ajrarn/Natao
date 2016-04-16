(function () {
    "use strict";

    var fs = require('fs');

    var modules = ['ngSanitize','pascalprecht.translate', 'ng-showdown'];

    angular
        .module('Natao', modules)
        .run(run);

    function run() {
        console.log('run');
    }

}());