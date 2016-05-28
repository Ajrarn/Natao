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
    }


    //Service itself
    function PendingService($timeout) {

        var self = this;
        self.pending = 0;
        self.loading = 0;
        self.$timeout = $timeout;

        self.start = function() {
            self.pending++;
        };

        self.stop = function() {
            self.pending--;

            if (self.pending <= 0) {
                //ensure that this affectation will be considerated by the $digest cycle
                self.$timeout(self.pending = 0);

            }
        };

        self.startLoading = function() {
            self.loading++;
        };

        self.stopLoading = function() {
            self.loading--;

            if (self.loading <= 0) {
                //ensure that this affectation will be considerated by the $digest cycle
                self.$timeout(self.loading = 0);

            }
        };

        self.showLoader = function() {
            return self.loading > 0;
        };

        return self;
    }

}());