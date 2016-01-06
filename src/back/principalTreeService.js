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
        self.docsMarkdown = [];
        self.principalTree = {};
        self.principalTree.selectedNode = null;

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
        };


        self.init = function() {
            self.db = self.PreferencesService.getDB();
            self.db.find({docName:'PrincipalTree'}, function (err, docs) {
                if (err || docs.length === 0) {
                    console.log('Principal Document not found');

                    self.principalTree = {
                        docName:'PrincipalTree',
                        tree: [],
                        expandedNodes: [],
                        selectedNode: null
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
                    console.log(self.principalTree);
                    self.$rootScope.$digest();
                }
            });
        };

        self.save = function() {
            var copyPrincipalTree = {};
            angular.copy(self.principalTree,copyPrincipalTree);
            self.db.update({_id: self.principalTree._id }, copyPrincipalTree, {}, function (err) {
                if (err) {
                    console.error('error:', err);
                }
            });
        };

        self.selectNode = function(node) {

            var indexNodeInExpanded = self.principalTree.expandedNodes.indexOf(node);

            if (indexNodeInExpanded >= 0) {
                self.principalTree.expandedNodes.splice(indexNodeInExpanded,1);
            } else {
                if (node.children && node.children.length > 0) {
                    self.principalTree.expandedNodes.push(node);
                }
            }

            //Find the documents linked to this node
            self.db.find({docName:'markdown',nodeId:node.id}, function (err, docs) {
                if (err) {
                    console.log('Markdown not found');
                } else {
                    self.docsMarkdown = docs;
                    self.$rootScope.$digest();
                }
            });

        };

        // if we do the save on the select node, the selected node is not yet set
        //so we have to watch it
        self.$rootScope.$watch(function(){
                return self.principalTree.selectedNode;
        },function() {
            self.save();
        });

        self.isNodeOpen = function(node) {
            if (node === self.principalTree.selectedNode || self.principalTree.expandedNodes.indexOf(node) >= 0) {
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
            if (!self.principalTree.selectedNode.children) {
                self.principalTree.selectedNode.children = [];
            }
            self.principalTree.selectedNode.children.push(newNode);
            self.principalTree.expandedNodes.push(self.principalTree.selectedNode);
            self.principalTree.selectedNode = newNode;
            self.save();
        };

        self.addClass = function() {
            var newNode = {
                id: uuid.v4(),
                name: 'New Folder'
            };
            self.principalTree.tree.push(newNode);
            self.principalTree.selectedNode = newNode;

            self.save();
        };

        self.addMarkdown = function() {

            var newMarkDown = {
                docName:'markdown',
                title:'test',
                nodeId: self.principalTree.selectedNode.id,
                created: new Date(),
                md:''
            };

            self.db.insert(newMarkDown, function (err, newDoc) {
                if (err) {
                    console.error(err);
                } else {
                    self.docsMarkdown.push(newDoc);
                    self.currentMarkdown = newDoc;
                    self.$rootScope.$digest();
                }
            });
        };



        self.saveCurrent = function() {
            var copyCurrent = {};
            angular.copy(self.currentMarkdown,copyCurrent);
            self.db.update({_id: self.currentMarkdown._id }, copyCurrent, {}, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        };

        return self;

    }
})();