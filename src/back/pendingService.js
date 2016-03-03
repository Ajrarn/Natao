(function () {
    "use strict";

    var _ = require('lodash')
        ,fs = require('fs');


    angular
        .module('Natao')
        .service('PendingService', PendingService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }


    //Service itself
    function PendingService() {

        var self = this;
        self.pending = false;

        self.start = function() {
            self.pending = true;
        };

        self.stop = function() {
            self.pending = false;
        };

        return self;
    }

}());