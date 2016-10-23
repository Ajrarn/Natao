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

        self.stateEvents = new Rx.Subject();
        self.pendingSaveState = false;
        self.waitToClose = false;

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
            },
            buffer: null
        };


        // receive the save event and save when it's time
        self.stateEvents.filter(item => item === 'save')
            .debounce(500)
            .subscribe(() => {
                    self.DatabaseService.save(self.appState)
                        .then(() => {
                            self.pendingSaveState = false;
                            self.checkClose();
                        })
                        .catch((err) => {
                            self.pendingSaveState = false;
                            self.checkClose();
                            console.error(err);
                        });

                },
                (err) => {
                    console.error(err);
                },
                () => {
                    self.pendingSaveState = false;
                });



        /**
         * get a promise that init the state of the app
         * @returns {*}
         */
        self.initAppState = () => {
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
        self.save = () => {
            self.pendingSaveState = true;
            self.stateEvents.onNext('save');
        };


        // ******************************* the trees ****************************************

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
        self.setPrincipalTree = (tree) => {
            self.appState.principalTree = tree;
            self.save();
        };

        /**
         * return the trashTree from the appState
         * @returns {initialState.principalTree|{tree, expandedNodes, selectedNode}}
         */
        self.getTrashTree = () =>  {
            return self.appState.trashTree;
        };

        /**
         * set the trashTree
         * @param tree
         */
        self.setTrashTree = (tree) => {
            self.appState.trashTree = tree;
            self.save();
        };

        // ******************************* the buffer ****************************************

        /**
         * reset the buffer
         */
        self.resetBuffer = () => {
            self.appState.buffer = null;
            self.save();
        };

        /**
         * set a value in the buffer
         * @param buffer
         */
        self.setBuffer = (buffer) => {
            self.appState.buffer = buffer;
            self.save();
        };

        /**
         * return the currentBuffer
         * @returns {null|*}
         */
        self.getBuffer = () => {
            return self.appState.buffer;
        };

        /**
         * return true if buffer contains anything
         * @returns {boolean}
         */
        self.hasBuffer = () => {
            return self.appState.buffer !== null;
        };

        // ******************************* the saves in pendings ****************************************

        /*
        The precedent code follow the save in the same document appState
        here we will follow the write of the other documents: the markdown
        the object is to avoid close the apps before all writes are done
         */

        self.nbWritePendings = 0;

        /**
         * add a write action when asked
         */
        self.startWrite = () => {
            self.nbWritePendings++;
        };

        /**
         * remove a write action when finished
         */
        self.stopWrite = () => {
            self.nbWritePendings--;
            self.checkClose();
        };
        
        // ***************************** wait for the end of saves ************************************

        /**
         * prepare to close and return the events
         * @returns {Rx.Subject}
         */
        self.close = () => {
            self.waitToClose = true;
            self.checkClose();
            return self.stateEvents;
        };

        /**
         * emit complete en the stateEvents when all is saved
         */
        self.checkClose = () => {
            if (self.waitToClose && !self.pendingSaveState && self.nbWritePendings === 0){
                self.stateEvents.onCompleted();
            }
        };
        

        return self;

    }

}());
