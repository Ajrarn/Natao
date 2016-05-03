(function () {
    "use strict";

    var uuid = require('node-uuid');
    var _ = require('lodash');
    var fs = require('fs');


    angular
        .module('Natao')
        .service('PrincipalTreeService', PrincipalTreeService)
        .run(run);

    //Start of the service
    function run() {
    }


    //Service itself
    function PrincipalTreeService(PreferencesService,TreeUtilService,CssService,TemplateTreeService,$q,PendingService,$timeout,$translate,DatabaseService,DocumentsService,$rootScope) {
        console.log('PrincipalTreeService');

        var self = this;
        self.PreferencesService = PreferencesService;
        self.TreeUtilService = TreeUtilService;
        self.CssService = CssService;
        self.TemplateTreeService = TemplateTreeService;
        self.PendingService = PendingService;
        self.$timeout = $timeout;
        self.$q = $q;
        self.$translate = $translate;
        self.DatabaseService = DatabaseService;
        self.DocumentsService = DocumentsService;
        self.$rootScope = $rootScope;
        self.docsMarkdown = [];
        self.principalTree = {
            docName: 'PrincipalTree',
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
            return self.principalTree.selectedNode;
        },function() {
            self.save();
        });

        self.getInitTreeService = function(defaultCss) {

            return self.$q(function(resolve,reject) {

                self.DatabaseService.find({docName:'PrincipalTree'})
                    .then(function(docs){
                        if (docs.length === 0) {
                            console.log('Principal Document not found');

                            self.principalTree.tree.defaultCss = defaultCss._id;

                            self.DatabaseService
                                .insert(self.principalTree)
                                .then(function(newDoc) {
                                    self.principalTree = newDoc;
                                    console.log('principalTree',self.principalTree);

                                    //We will create the first document
                                    self.$translate('WELCOME').then(function (translation) {
                                        self.addFolderOnly(translation);
                                        var welcomeMd = fs.readFileSync('./languages/welcome-' + self.$translate.use() + '.md','utf8');
                                        self.addMarkdown(self.principalTree.selectedNode,translation,welcomeMd);
                                    });

                                    resolve();
                                })
                                .catch(function(err) {
                                    reject(err);
                                });

                        } else {
                            self.principalTree = docs[0];
                            console.log('principalTree', self.principalTree);
                            resolve();
                        }
                    }).catch(function(err) {
                    reject(err);
                });
            });
        };


        self.save = function() {
            self.PendingService.start();

            self.DatabaseService
                .update(self.principalTree._id,self.principalTree)
                .then(function(doc) {
                    self.PendingService.stop();
                    self.principalTree = doc;
                })
                .catch(function(err) {
                    self.PendingService.stop();
                    console.error('error:', err);
                });

        };


        self.addFolder = function(nodeName,nodeParent,templateName) {
            if (templateName) {
                if (!nodeParent) {
                    nodeParent = self.principalTree.tree;
                }

                var template = self.TemplateTreeService.getTemplate(templateName);
                var newFolder = {};
                angular.copy(template,newFolder);
                newFolder.name = nodeName;
                delete newFolder.docName;

                //We start the pending and count the node to paste
                self.nodesPendingPaste = self.TreeUtilService.howManyNodes(newFolder);
                self.PendingService.start();

                self.pasteNodefolder(nodeParent,newFolder);
                //the save will be done at the end of the paste action
            } else {
                self.addFolderOnly(nodeName,nodeParent);
                self.save();
            }

        };


        self.addFolderOnly = function(nodeName,nodeParent) {

            var newNode = {
                id: uuid.v4(),
                name: nodeName,
                color: '#000000',
                children:[]
            };

            if (!nodeParent) {
                nodeParent = self.principalTree.tree;
            }
            newNode.defaultCss = nodeParent.defaultCss;
            nodeParent.children.push(newNode);

            //and we open the node parent
            self.principalTree.expandedNodes.push(nodeParent);

            // if the new folder is the first one
            if (!self.principalTree.selectedNode) {
                self.principalTree.selectedNode = newNode;
            }

        };

        self.addClass = function(nameClass,nameTemplate) {
            self.addFolder(nameClass,null,nameTemplate);
        };


        //copy of a document by its content to a node in the tree
        self.copyDocumentTo = function(originalDoc,nodeParent) {

            var newDocument = {};
            angular.copy(originalDoc, newDocument);
            delete newDocument._id;


            //and then add it to the database
            self.PendingService.start();

            self.DatabaseService
                .insert(newDocument)
                .then(function(newDoc) {
                    self.PendingService.stop();
                    var newNode = {
                        id: newDoc._id,
                        name: newDoc.title,
                        leaf: true
                    };

                    if (!nodeParent.children) {
                        nodeParent.children = [];
                    }
                    nodeParent.children.push(newNode);
                    self.save();
                })
                .catch(function(err) {
                    self.PendingService.stop();
                    console.error(err);
                });
        };


        //delete of a node
        self.deleteNode = function(node) {

            self.TreeUtilService
                .deleteNode(node,self.principalTree.tree)
                .then(function() {

                    //First we have to check if we have deleted the selected node
                    var selNode = self.TreeUtilService.getNode(self.principalTree.selectedNode,self.principalTree.tree);
                    if (!selNode) {
                        delete self.principalTree.selectedNode;
                    }

                    //and check the selected markdown
                    selNode = self.TreeUtilService.getNode(self.principalTree.selectedNode,self.principalTree.currentMarkdownId);
                    if (!selNode) {
                        self.principalTree.currentMarkdownId = null;
                        self.currentMarkdown = null;
                    }

                    //finally we have to clean the expandedNodes
                    var arrayOfNode = self.TreeUtilService.flatFolders(self.principalTree.tree);
                    self.expandedNodes = _.intersectionWith(self.expandedNodes,arrayOfNode,function(object,other) {
                        return object.id === other.id;
                    });

                    self.save();

                })
                .catch(function(err) {
                    console.error(err);
                });
        };


        return self;

    }
}());