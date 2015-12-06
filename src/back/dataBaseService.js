(function () {
    "use strict";

    var fs = require('fs');

    angular
        .module('Natao')
        .service('DatabaseService', DatabaseService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }


    //Service itself
    function DatabaseService() {
        console.log('DatabaseService');

        var self = this;
        var myConfig;

        var data = fs.readFileSync('myConfig.json',myConfig);
        try {
            myConfig = JSON.parse(data);
            console.log('DataFile',myConfig);
        }
        catch (err) {
            console.log('There has been an error parsing your JSON.')
            console.log(err);
        }

        return self;


    }

}());