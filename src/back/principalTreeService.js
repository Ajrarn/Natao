(function () {
    "use strict";

    var uuid = require('node-uuid');


    angular
        .module('Natao')
        .service('PrincipalTreeService', PrincipalTreeService)
        .run(run);

    //Start of the service
    function run() {
    }


    //Service itself
    function PrincipalTreeService(PreferencesService,$rootScope) {
        console.log('PrincipalTreeService');

        var self = this;
        self.PreferencesService = PreferencesService;
        self.$rootScope = $rootScope;

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
            }
        }


        self.init = function() {
            self.db = self.PreferencesService.getDB();
            self.db.find({docName:'PrincipalTree'}, function (err, docs) {
                if (err || docs.length === 0) {
                    console.log('Principal Document not found');

                    self.principalTree = {
                        docName:'PrincipalTree',
                        tree: []
                    };

                    self.db.insert(self.principalTree, function (err, newDoc) {
                        if (err) {
                            console.error('error:',err);
                        } else {
                            self.principalTree = newDoc;
                        }
                    });

                } else {
                    self.principalTree = docs[0];
                    self.$rootScope.$digest();
                }
            });
        };

        self.save = function() {
            var copyPrincipalTree = {};
            angular.copy(self.principalTree,copyPrincipalTree);
            self.db.update({ _id: self.principalTree._id }, copyPrincipalTree, {}, function (err,doc) {
                if (err) {
                    console.error('error:',err);
                } /*else {
                    self.principalTree = doc;
                }*/
            });
        };

        self.selectNode = function(node) {

            var indexNodeInExpanded = self.expandedNodes.indexOf(node);

            if (indexNodeInExpanded >= 0) {
                self.expandedNodes.splice(indexNodeInExpanded,1);
            } else {
                if (node.children && node.children.length > 0) {
                    self.expandedNodes.push(node);
                }
            }
        };

        self.isNodeOpen = function(node) {
            if (node === self.selectedNode || self.expandedNodes.indexOf(node) >= 0) {
                return 'open';
            } else {
                return 'close';
            }
        };

        self.addFolder = function() {
            var newNode = {
                id: uuid.v4(),
                name: 'New Folder'
            };
            if (!self.selectedNode.children) {
                self.selectedNode.children = [];
            }
            self.selectedNode.children.push(newNode);
            self.expandedNodes.push(self.selectedNode);
            self.selectedNode = newNode;
            self.save();
        };

        self.addClass = function() {
            var newNode = {
                id: uuid.v4(),
                name: 'New Folder'
            };
            self.principalTree.tree.push(newNode);
            self.selectedNode = newNode;

            self.save();
        };


        return self;


    }

}());