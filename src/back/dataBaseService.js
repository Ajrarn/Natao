(function () {
    "use strict";

    var fs = require('fs')
        ,path = require('path')
        ,Datastore = require('nedb');

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


        self.getDB = function(file) {
            if (!self.db) {
                self.db = new Datastore({ filename: file, autoload:true});
            }
            return self.db;
        };


        return self;


    }

}());