(function () {
    "use strict";

    var Rx = require('rx');

    angular
        .module('Natao')
        .service('AppStateService', AppStateService)
        .run(run);

    //Start of the service
    function run() {
    }

    //Service itself
    function AppStateService($q, DatabaseService) {

        var self = this;

        self.$q = $q;
        self.DatabaseService = DatabaseService;

        self.eventSet = new Rx.Subject();
        self.pendingSave = false;

        self.appState = {
            docName: 'AppState',
            principalTree: {
                tree: {
                    defaultCss: null,
                    children: []
                },
                expandedNodes: [],
                selectedNode: null
            },
            trashTree: {
                tree: {
                    children: []
                },
                expandedNodes: [],
                selectedNode: null
            }
        };


        // receive the save event and save when it's time
        self.eventSet.filter(item => item === 'save')
            .debounce(500)
            .subscribe(() => {
                    self.DatabaseService.save(self.appState)
                        .then(() => {
                            self.pendingSave = false;
                        })
                        .catch((err) => {
                            self.pendingSave = false;
                            console.error(err);
                        });

                },
                (err) => {
                    console.error(err);
                },
                () => {
                    self.pendingSave = false;
                });



        /**
         * get a promise that init the state of the app
         * @returns {*}
         */
        self.initAppState = function() {
            return self.$q(function(resolve,reject) {
                self.DatabaseService.find({docName:'AppState'})
                    .then(function(docs) {
                        if (docs.length === 0) {
                            self.DatabaseService
                                .save(self.appState)
                                .then(function(newDoc) {
                                    self.appState = newDoc;
                                    resolve();
                                })
                                .catch(function(err) {
                                    reject(err);
                                });
                        } else {
                            self.appState = docs[0];
                            resolve();
                        }
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
        };

        /**
         * emit the save event
         */
        self.save = function() {
            self.pendingSave = true;
            self.eventSet.onNext('save');
        };

        /**
         * return the principalTree from the appState
         * @returns {initialState.principalTree|{tree, expandedNodes, selectedNode}}
         */
        self.getPrincipalTree = function() {
            return self.appState.principalTree;
        };

        /**
         * set the principalTree
         * @param tree
         */
        self.setPrincipalTree = function(tree) {
            self.appState.principalTree = tree;
            self.save();
        };

        /**
         * return the trashTree from the appState
         * @returns {initialState.principalTree|{tree, expandedNodes, selectedNode}}
         */
        self.getTrashTree = function() {
            return self.appState.trashTree;
        };

        /**
         * set the trashTree
         * @param tree
         */
        self.setTrashTree = function(tree) {
            self.appState.trashTree = tree;
            self.save();
        };

        return self;

    }

}());
