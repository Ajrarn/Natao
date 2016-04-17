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
    function DatabaseService($q) {
        console.log('DatabaseService');

        var self = this;
        self.$q = $q;
        
        self.setDB = function(file) {
            if (!self.db || self.db.filename != file) {
                self.db = new Datastore({ filename: file, autoload:true});
            }
        };
        
        self.getDB = function(file) {
            self.setDB(file);
            return self.db;
        };
        
        self.find = function(findParams) {
            return self.$q(function(resolve,reject) {
                self.db.find(findParams,function(err,docs) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
            });
        };


        return self;


    }

}());