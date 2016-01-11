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
                    console.log('principalTree',self.principalTree);
                    self.initMarkdown();
                    //Init the css service
                    self.CssService.init(self.db,self.principalTree.selectedNode.css);
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

            /*if (node.css) {
                self.CssService.initCurrent(node.css);
            }*/


        };

        // if we do the save on the select node, the selected node is not yet set
        //so we have to watch it
        self.$rootScope.$watch(function(){
                return self.principalTree.selectedNode;
        },function() {
            self.initMarkdown();
            self.save();
        });

        self.initMarkdown = function() {
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
        };

        self.isNodeOpen = function(node) {
            if (node.id === self.principalTree.selectedNode.id || _.findIndex(self.principalTree.expandedNodes,{id:node.id}) >= 0) {
                return 'open';
            } else {
                return 'close';
            }
        };

        self.addFolder = function() {
            var newNode = {
                id: uuid.v4(),
                name: 'New Folder',
                css:'default'
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
                name: 'New Folder',
                css: 'default'
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
                    self.principalTree.currentMarkDownId = newDoc._id;
                    self.save();
                    self.$rootScope.$digest();
                }
            });
        };

        self.selectMarkdown = function(doc) {
            if (!angular.equals(doc,self.currentMarkdown)) {
                angular.copy(doc,self.currentMarkdown);
                self.principalTree.currentMarkDownId = doc._id;
                self.save();
                //set the good css
                if (self.principalTree.selectedNode.css) {
                    self.CssService.initCurrent(self.principalTree.selectedNode.css);
                }
            }
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
}());