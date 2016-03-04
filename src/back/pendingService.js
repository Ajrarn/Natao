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
    function PendingService($rootScope) {

        var self = this;
        self.$rootScope = $rootScope;
        self.pending = 0;

        self.start = function() {
            self.pending++;
            console.log('pending',self.pending);
        };

        self.stop = function() {
            self.pending--;

            if (self.pending <= 0) {
                self.pending = 0;
                self.$rootScope.$digest()
            }
            console.log('pending',self.pending);
        };

        self.showLoader = function() {
            return self.pending > 0;
        };

        return self;
    }

}());