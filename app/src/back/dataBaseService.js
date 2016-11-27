(function () {
    "use strict";

    var fs = require('fs')
        ,path = require('path')
        ,Datastore = require('nedb')
        ,uuid = require('node-uuid')
        ,Rx = require('rx');

    angular
        .module('Natao')
        .service('DatabaseService', DatabaseService)
        .run(run);

    //Start of the service
    function run() {
    }


    /**
     * the service to use the database (here NeDb)
     * @param $q
     * @param rx
     * @returns {DatabaseService}
     * @constructor
     */
    function DatabaseService($q, $rootScope) {

        var self = this;
        self.$q = $q;
        self.$rootScope = $rootScope;


        /**************************** The old API ********************************/

        /**
         * set the datastore with the database file
         * @param file
         */
        self.setDB = function(file) {
            if (!self.db || self.db.filename != file) {
                self.db = new Datastore({ filename: file, autoload:true});
            }
        };

        /**
         * set the and get the datastore from the database file
         * @param file
         * @returns {*}
         */
        self.getDB = function(file) {
            self.setDB(file);
            return self.db;
        };

        /**
         * find a document
         * return a promise
         * @param findParams
         * @param limit the number of occurences (if none, no limit)
         * @returns {*}
         */
        self.find = function(findParams, limit) {
            return self.$q(function(resolve,reject) {
                if (limit) {
                    self.db.find(findParams).limit(limit).exec(function(err,docs) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(docs);
                        }
                    });
                } else {
                    self.db.find(findParams,function(err,docs) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(docs);
                        }
                    });
                }

            });
        };

        /**
         * update a document
         * return a promise
         * @param id
         * @param doc
         * @returns {*}
         */
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

        /**
         * update multiple documents
         * @param query
         * @param set
         * @returns {*}
         */
        self.updateMassive = (query, set) => {
            return self.$q((resolve,reject) => {
                self.db.update(query, {$set: set}, {multi: true}, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        };

        /**
         * insert a document
         * return a promise
         * @param doc
         * @returns {*}
         */
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

        /**
         * remove a document
         * return a promise
         * @param id
         * @returns {*}
         */
        self.delete = function(id) {
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

        /**
         * save a document return a promise
         * @param doc
         * @returns {*}
         */
        self.save = function(doc) {

            var savePromise;

            if (doc._id) {
                savePromise = self.update(doc._id, doc);
            } else {
                savePromise = self.insert(doc);
            }

            return savePromise;
        };

        return self;


    }

}());