(function () {
    "use strict";

    var uuid = require('node-uuid');
    var _ = require('lodash');
    var fs = require('fs');


    angular
        .module('Natao')
        .service('TrashTreeService', TrashTreeService)
        .run(run);

    //Start of the service
    function run() {
    }


    //Service itself
    function TrashTreeService(TreeUtilService,$q,PendingService,$translate,DatabaseService,DocumentsService,$rootScope) {

        var self = this;
        self.TreeUtilService = TreeUtilService;
        self.PendingService = PendingService;
        self.$q = $q;
        self.$translate = $translate;
        self.DatabaseService = DatabaseService;
        self.DocumentsService = DocumentsService;
        self.$rootScope = $rootScope;
        self.docsMarkdown = [];
        self.trashTree = {
            docName: 'TrashTree',
            tree: {
                children:[]
            },
            expandedNodes: [],
            selectedNode: null
        };

        self.cutNodePending = null;
        self.exportFileName = null;
        self.docsPendingForBuffer = 0;
        self.nodesPendingPaste = 0;

        self.treeOptions = {
            nodeChildren: "children",
            dirSelectable: true,
            injectClasses: {
                ul: "a1",
                li: "a2",
                liSelected: "a7",
                iExpanded: "a3",
                iCollapsed: "a4",
                iLeaf: "a5",
                label: "a6",
                labelSelected: "a8"
            },
            isLeaf: function(node) {
                return node.leaf;
            }
        };

        // if we do the save on the select node, the selected node is not yet set
        //so we have to watch it
        self.$rootScope.$watch(function(){
            return self.trashTree.selectedNode;
        },function() {
            self.save();
        });

        /**
         * save asynchroneous
         */
        self.save = function() {
            self.PendingService.start();

            self.DatabaseService
                .save(self.trashTree)
                .then(function(doc) {
                    self.PendingService.stop();
                    self.trashTree = doc;
                })
                .catch(function(err) {
                    self.PendingService.stop();
                    console.error(err);
                });

        };

        self.getInitTreeService = function() {
            return self.$q(function(resolve,reject) {
                self.DatabaseService.find({docName:'TrashTree'})
                    .then(function(docs){
                        if (docs.length === 0) {
                            self.DatabaseService
                                .save(self.trashTree)
                                .then(function(newDoc) {
                                    self.trashTree = newDoc;
                                    resolve();
                                })
                                .catch(function(err) {
                                    reject(err);
                                });

                        } else {
                            self.trashTree = docs[0];
                            resolve();
                        }
                    }).catch(function(err) {
                    reject(err);
                });
            });
        };

        self.addNode = function(node) {
            self.trashTree.tree.children.push(node);
        };

        /**
         * delete a node definitively
         * @param node
         * @returns {*}
         */
        self.deleteNode = function(node) {

            return self.$q(function(resolve,reject) {

                self.TreeUtilService
                    .deleteNode(node,self.trashTree.tree)
                    .then(function() {

                        //First we have to check if we have deleted the selected node
                        if(self.trashTree.selectedNode) {
                            var selNode = self.TreeUtilService.getNode(self.trashTree.selectedNode.id,self.trashTree.tree);
                            if (!selNode) {
                                delete self.trashTree.selectedNode;
                            }
                        }


                        //finally we have to clean the expandedNodes
                        var arrayOfNode = self.TreeUtilService.flatFolders(self.trashTree.tree);
                        self.expandedNodes = _.intersectionWith(self.expandedNodes,arrayOfNode,function(object,other) {
                            return object.id === other.id;
                        });

                        self.save();

                        resolve();

                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });

        };

        self.getHighestParent = function(node) {
            if (node.nodeFrom) {
                return node;
            } else {

                var nodeFound = null;
                var highestParent = null;
                for (var index = 0; index < self.trashTree.tree.children.length && !nodeFound; index++) {
                    nodeFound = self.TreeUtilService.getNode(node.id, self.trashTree.tree.children[index]);
                    if (nodeFound) {
                        highestParent = self.trashTree.tree.children[index];
                    }
                }
                return highestParent;

            }
        };




        return self;

    }
}());