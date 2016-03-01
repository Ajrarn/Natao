(function () {
    "use strict";

    var fs = require('fs');

    angular
        .module('Help')
        .controller('HelpController', HelpController);


    function HelpController($location) {
        console.log('HelpController');

        var self = this;
        self.$location = $location;
        self.urlArray = $location.absUrl().split('?');
        self.paramArray = self.urlArray[1].split('=');

        self.param = self.paramArray[1];
        self.currentHelp = fs.readFileSync(self.param,'utf8');
    }

}());