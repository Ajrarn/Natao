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

        self.update = function(id, doc) {
            return self.$q(function(resolve,reject) {
                
                var copyCurrent = {};
                angular.copy(doc,copyCurrent);
                
                self.db.update({ _id: id }, copyCurrent, {}, function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc);
                    }
                });
            });
        };

        self.insert = function(doc) {
          return self.$q(function(resolve,reject) {
              
              self.db.insert(doc,function(err,newDoc) {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(newDoc);
                  }
              });

          });
        };

        self.remove = function(id) {
            return self.$q(function(resolve,reject) {
                self.db.remove({ _id: id }, {}, function(err, numRemoved) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(numRemoved);
                    }
                })
            });
        };


        return self;


    }

}());