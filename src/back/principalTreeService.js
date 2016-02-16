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
                        docName: 'PrincipalTree',
                        tree: [],
                        expandedNodes: [],
                        selectedNode: null
                    };

                    self.db.insert(self.principalTree, function (err, newDoc) {
                        if (err) {
                            console.error('error:', err);
                        } else {
                            self.principalTree = newDoc;
                        }
                    });

                    self.CssService.init(self.db, null);

                } else {
                    self.principalTree = docs[0];
                    console.log('principalTree', self.principalTree);
                    if (self.principalTree.selectedNode) {
                        self.CssService.init(self.db, self.principalTree.selectedNode.css);
                    } else {
                        self.CssService.init(self.db, null);
                    }

                    if (self.principalTree.currentMarkdownId) {
                        self.db.find({
                            docName: 'markdown',
                            _id: self.principalTree.currentMarkdownId
                        }, function (err, docs) {
                            if (err) {
                                console.error(err);
                            } else {
                                self.currentMarkdown = docs[0];
                            }
                        });

                        self.$rootScope.$digest();
                        setTimeout(self.refreshMath, 100);  //without angular $digest
                    }
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

            if (node.leaf) {
                if ( !self.principalTree.currentMarkdownId || (self.principalTree.currentMarkdownId && node.id !== self.principalTree.currentMarkdownId)) {
                    self.db.find({docName:'markdown',_id: node.id}, function (err, docs) {
                        if (err) {
                            console.error(err);
                        } else {
                            if (docs && docs.length > 0){
                                self.currentMarkdown = docs[0];
                                self.CssService.initCurrent(self.currentMarkdown.css);
                                self.principalTree.currentMarkdownId = self.currentMarkdown._id;
                                self.save();
                                self.$rootScope.$digest();

                                setTimeout(self.refreshMath, 100);  //without angular $digest
                            }
                        }
                    });
                }
            }
        };

        self.refreshMath = function() {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        };

        // if we do the save on the select node, the selected node is not yet set
        //so we have to watch it
        self.$rootScope.$watch(function(){
                return self.principalTree.selectedNode;
        },function() {
            self.save();
        });


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

                //and we open the node parent
                self.principalTree.expandedNodes.push(node);

            } else {
                self.principalTree.tree.push(newNode);
            }

            // if the new folder is the first one
            if (!self.principalTree.selectedNode) {
                self.principalTree.selectedNode = newNode;
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
                css:'lesson.css',
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
                    self.CssService.initCurrent(self.currentMarkdown.css);
                    self.principalTree.selectedNode = newNode;
                    //and we open the node parent
                    self.principalTree.expandedNodes.push(node);
                    self.save();
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
                } else {
                    self.principalTree.selectedNode.name = self.currentMarkdown.title;
                    self.CssService.initCurrent(self.currentMarkdown.css);
                    self.save();
                    setTimeout(self.refreshMath, 100);  //without angular $digest
                }

            });
        };

        return self;

    }
}());