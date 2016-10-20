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
    function TrashTreeService(TreeUtilService,$q,PendingService,$translate,DatabaseService,DocumentsService,$rootScope, AppStateService) {

        var self = this;
        self.TreeUtilService = TreeUtilService;
        self.PendingService = PendingService;
        self.$q = $q;
        self.$translate = $translate;
        self.DatabaseService = DatabaseService;
        self.DocumentsService = DocumentsService;
        self.AppStateService = AppStateService;
        self.$rootScope = $rootScope;
        self.docsMarkdown = [];

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
        // so we have to watch it
        // and don't save the first time
        self.trashTree = { selectedNode: null };
        self.initWatch = true;
        self.$rootScope.$watch(function(){
            return self.trashTree.selectedNode;
        },function() {
            if (self.initWatch) {
                self.initWatch = false;
            } else {
                self.save();
            }
        });


        /**
         * save asynchroneous
         */
        self.save = function() {
            self.AppStateService.setTrashTree(self.trashTree);
        };

        /**
         *
         * @returns {*}
         */
        self.initTreeService = function() {
            self.trashTree = self.AppStateService.getTrashTree();
        };

        /**
         * add a node to the trash tree
         * @param node
         */
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

        /**
         * get the highest parent of the node we want to restore
         * to have the node and the path where it come from
         * @param node
         * @returns {*}
         */
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