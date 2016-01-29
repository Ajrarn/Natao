(function () {
    "use strict";

    var uuid = require('node-uuid');
    var _ = require('lodash');


    angular
        .module('Natao')
        .service('PrincipalTreeService', PrincipalTreeService)
        .run(run);

    //Start of the service
    function run() {
    }


    //Service itself
    function PrincipalTreeService(PreferencesService,CssService,$rootScope) {
        console.log('PrincipalTreeService');

        var self = this;
        self.PreferencesService = PreferencesService;
        self.CssService = CssService;
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
            },
            isLeaf: function(node) {
                return node.leaf;
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

                    self.CssService.init(self.db,null);

                } else {
                    self.principalTree = docs[0];
                    console.log('principalTree',self.principalTree);
                    self.initTreeView();
                    //self.initMarkdown();
                    //Init the css service
                    if (self.principalTree.selectedNode) {
                        self.CssService.init(self.db,self.principalTree.selectedNode.css);
                    } else {
                        self.CssService.init(self.db,null);
                    }

                    self.$rootScope.$digest();
                }
            });
        };

        //recursive function that read the tree of folders and add the markdown documents
        self.initTreeView = function(nodeTree) {
            var children = [];
            if (!nodeTree) {
                self.treeView = self.principalTree.tree.map(function(item) {
                    return item;
                });
                children = self.treeView;
            } else {
                children = nodeTree.children;
            }

            if (children && children.length >0) {
                children.forEach(function(node) {
                    self.db.find({docName:'markdown',nodeId:node.id}, function (err, docs) {
                        if (err) {
                            console.error(err);
                        } else {
                            if (docs && docs.length > 0) {
                                node.children = docs.map(function(item) {
                                    return {
                                        id: item._id,
                                        name: item.title,
                                        leaf: true
                                    };
                                });
                            }
                        }
                    });
                    self.initTreeView(node);
                });
            }
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

            if (node.leaf) {
                if (node.id !== self.currentMarkdown._id) {
                    self.db.find({docName:'markdown',_id: node.id}, function (err, docs) {
                        if (err) {
                            console.error(err);
                        } else {
                            if (docs && docs.length > 0){
                                self.currentMarkdown = docs[0];
                                self.$rootScope.$digest();
                            }
                        }
                    });
                }
            }

            /*if (!node.children) {
                self.principalTree.currentMarkDownId = node.id;
                self.db.find({docName:'markdown',_id:node.id}, function (err, docs) {
                    if (err) {
                        console.error(err);
                    } else {
                        if (docs && docs.length > 0) {
                            self.currentMarkdown = docs[0];
                            self.$rootScope.$digest();
                        }
                    }
                });
            }*/

        };

        // if we do the save on the select node, the selected node is not yet set
        //so we have to watch it
        self.$rootScope.$watch(function(){
                return self.principalTree.selectedNode;
        },function() {
            self.save();
        });

        /*self.initMarkdown = function() {
            //Find the documents linked to this node
            if (self.principalTree.selectedNode) {
                self.db.find({docName:'markdown',nodeId:self.principalTree.selectedNode.id}, function (err, docs) {
                    if (err) {
                        console.log('Markdown not found');
                    } else {
                        self.docsMarkdown = docs;
                        if (self.principalTree.currentMarkDownId) {
                            // If the selected node contains the saved markedDown doc id then show it
                            if (_.findIndex(self.docsMarkdown, {_id:self.principalTree.currentMarkDownId}) >= 0) {
                                self.currentMarkdown = _.find(self.docsMarkdown,{_id:self.principalTree.currentMarkDownId});
                            }

                        }
                        self.$rootScope.$digest();
                    }
                });
            }
        };*/

        /*self.isNodeOpen = function(node) {
            if (node.id === self.principalTree.selectedNode.id || _.findIndex(self.principalTree.expandedNodes,{id:node.id}) >= 0) {
                return 'open';
            } else {
                return 'close';
            }
        };*/

        self.addFolder = function(nodeName,node) {

            var newNode = {
                id: uuid.v4(),
                name: nodeName,
                css:'default'
            };

            if (node) {
                if (!node.children) {
                    node.children = [];
                }
                node.children.push(newNode);
            } else {
                self.principalTree.tree.push(newNode);
            }
            self.save();
        };

        self.addClass = function(nameClass) {
            self.addFolder(nameClass);
        };

        self.addMarkdown = function(node) {

            var newMarkDown = {
                docName:'markdown',
                title:'test',
                created: new Date(),
                md:''
            };

            self.db.insert(newMarkDown, function (err, newDoc) {
                if (err) {
                    console.error(err);
                } else {

                    var newNode = {
                        id: newDoc._id,
                        name: newDoc.title,
                        leaf: true
                    };

                    if (!node.children) {
                        node.children = [];
                    }
                    node.children.push(newNode);

                    self.currentMarkdown = newDoc;
                    self.principalTree.selectedNode = newNode;
                    self.save();
                    self.$rootScope.$digest();
                }
            });
        };

        /*self.selectMarkdown = function(node) {

            if (node.id !== self.currentMarkdown._id) {
                self.db.find({docName:'markdown',_id: node.id}, function (err, docs) {
                    if (err) {
                        console.error(err);
                    } else {
                        if (docs && docs.length > 0){
                            self.currentMarkdown = docs[0];
                        }
                    }
                });
            }

        };*/

        self.saveCurrent = function() {
            var copyCurrent = {};
            angular.copy(self.currentMarkdown,copyCurrent);
             self.db.update({_id: self.currentMarkdown._id }, copyCurrent, {}, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    self.principalTree.selectedNode.name = self.currentMarkdown.title;
                    self.save();
                }

            });
        };

        return self;

    }
}());