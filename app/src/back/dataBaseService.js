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
         * @returns {*}
         */
        self.findDocument = function(findParams) {
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

        /**************************** The new API ********************************/

        self.working = false;
        self.queue = [];
        self.eventTask = new Rx.Subject();
        self.currentEventTask = 'start';
        self.taskDone = new Rx.Subject();



        // This part ensure that all tasks are made one by one synchronously
        self.taskObserver = self.eventTask.filter(function(eventItem) {
            return eventItem === 'start';
        }).subscribe(function() {
            if (self.queue.length > 0) {
                self.pause();
                var task = self.queue.shift();
                self.resolveTask(task);
            } else {
                self.taskWaiting = false;
            }
        });

        /**
         * emit a start event to resolve a task in the queue
         */
        self.start = function() {
            self.eventTask.onNext('start');
            self.currentEventTask = 'start';
        };

        /**
         * emit a pause event to avoid resolving a task before finishing the current task
         */
        self.pause = function() {
            self.eventTask.onNext('pause');
            self.currentEventTask = 'pause';
        };


        /**
         * add a task to the queue and return it's id
         * @param typeTask
         * @param payload
         * @returns {*}
         */
        self.addTask = function(typeTask, payload) {
            var task = {
                id : uuid.v4(),
                type: typeTask,
                payload: payload
            };

            var previousLength = self.queue.length;

            self.queue.push(task);

            if (self.currentEventTask === 'start' && previousLength === 0) {
                self.start();
            }

            return task.id;

        };


        /**
         * resolve a task submit and put an "event" in the taskDone Subject
         * @param task
         */
        self.resolveTask = function(task) {

            var resolvePromise;

            switch (task.type) {
                case 'insert':
                    resolvePromise = self.insert(task.payload);
                    break;
                case 'update':
                    resolvePromise = self.update(task.payload._id,task.payload);
                    break;
                case 'delete':
                    resolvePromise = self.remove(task.payload);
                    break;
                default:
                    //find
                    resolvePromise = self.findDocument(task.payload);
            }

            resolvePromise.then(function(document) {
                self.taskDone.onNext({
                    id: task.id,
                    done: true,
                    document: document,
                    err: null
                });

                self.start();
            }).catch(function(err) {
                self.taskDone.onNext({
                    id: task.id,
                    done: false,
                    document: null,
                    err: err
                });

                self.start();
            });
        };

        self.find = function(findParams) {

            return self.$q(function(resolve,reject) {
                var taskId = self.addTask('find', findParams);

                self.taskDone
                    .filter(function(item) {
                        return item.id === taskId;
                    })
                    .first()
                    .subscribe(function(job) {
                        if (job.done) {
                            resolve(job.document);
                        } else {
                            reject(job.err);
                        }
                    });
            });
        };

        /**
         * save a document
         * return a promise
         * @param document
         * @returns {*}
         */
        self.save = function(document) {
            var typeTask;
            if (document._id) {
                typeTask = 'update';
            } else {
                typeTask = 'insert';
            }



            return self.$q(function(resolve,reject) {
                var taskId = self.addTask(typeTask, document);
                self.taskDone
                        .filter(function(item) {
                            return item.id === taskId;
                        })
                        .first()
                        .subscribe(function(job) {
                            if (job.done) {
                                resolve(job.document);
                            } else {
                                reject(job.err);
                            }
                        });
            });
        };

        /**
         * delete a document
         * return a promise
         * @param id
         * @returns {*}
         */
        self.delete = function(id) {

            return self.$q(function(resolve,reject) {
                var taskId = self.addTask('delete', id);

                self.taskDone
                        .filter(function(item) {
                            return item.id === taskId;
                        })
                        .first()
                        .subscribe(function(job) {
                            if (job.done) {
                                resolve(job.document);
                            } else {
                                reject(job.err);
                            }
                        });
            });

        };


        return self;


    }

}());