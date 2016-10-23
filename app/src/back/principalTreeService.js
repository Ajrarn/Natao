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
    function PrincipalTreeService(TreeUtilService,TemplateTreeService,$q,$translate,DatabaseService,DocumentsService,$rootScope, AppStateService) {

        var self = this;
        self.TreeUtilService = TreeUtilService;
        self.TemplateTreeService = TemplateTreeService;
        self.$q = $q;
        self.$translate = $translate;
        self.DatabaseService = DatabaseService;
        self.DocumentsService = DocumentsService;
        self.AppStateService = AppStateService;
        self.$rootScope = $rootScope;
        self.docsMarkdown = [];

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
        // so we have to watch it
        // and don't save the first time
        self.principalTree = { selectedNode: null };
        self.initWatch = true;

        self.$rootScope.$watch(function(){
            return self.principalTree.selectedNode;
        },function() {
            if (self.initWatch) {
                self.initWatch = false;
            } else {
                self.save();
            }
        });


        /**
         * init the principal tree service
         * return a promise
         * @param defaultCss
         * @returns {*}
         */
        self.getInitTreeService = function(defaultCss) {

            return self.$q(function(resolve,reject) {

                self.principalTree = self.AppStateService.getPrincipalTree();

                if (!self.principalTree.tree.defaultCss) {

                    self.principalTree.tree.defaultCss = defaultCss._id;

                    //We will create the first document
                    self.$translate('FIRST_DOC').then(function (translation) {
                        self.addFolder(translation)
                            .then(function(node) {

                                self.principalTree.expandedNodes.push(node);

                                var welcomeMd = fs.readFileSync('./languages/welcome-' + self.$translate.use() + '.md','utf8');

                                self.DocumentsService
                                    .addDocument(self.principalTree.tree.defaultCss,translation,welcomeMd)
                                    .then(function(newDoc) {

                                        var newNode = {
                                            id: newDoc._id,
                                            name: newDoc.title,
                                            leaf: true
                                        };

                                        node.children.push(newNode);
                                        self.principalTree.selectedNode = newNode;
                                        self.save();

                                        resolve();
                                    })
                                    .catch(function(err ){
                                        reject(err);
                                    });

                            })
                            .catch(function(err) {
                                reject(err);
                            });

                    });

                } else {
                    resolve();
                }

            });
        };


        self.save = function() {
            self.AppStateService.setPrincipalTree(self.principalTree);
        };




        self.addFolder = function(nodeName,nodeParent,templateName) {

            return self.$q(function(resolve,reject) {

                if (!nodeParent) {
                    nodeParent = self.principalTree.tree;
                }

                if (templateName) {

                    // To make a good copy we will pass by the buffer
                    self.TreeUtilService
                        .nodeToBuffer(self.TemplateTreeService.getTemplate(templateName))
                        .then(function (buffer) {
                            self.TreeUtilService
                                .bufferToNode(buffer)
                                .then(function (node) {
                                    delete node.docName;
                                    node.name = nodeName;
                                    nodeParent.children.push(node);
                                    self.save();
                                    resolve(node);
                                })
                                .catch(function (err) {
                                    reject(err);
                                })
                        })
                        .catch(function (err) {
                            reject(err);
                        });
                } else {
                    var newNode = {
                        id: uuid.v4(),
                        name: nodeName,
                        color: '#000000',
                        defaultCss: nodeParent.defaultCss,
                        children: []
                    };

                    nodeParent.children.push(newNode);
                    self.save();
                    resolve(newNode);
                }

            });


        };

        //delete of a node
        self.deleteNode = function(node) {
            
            return self.$q(function(resolve,reject) {
                
                self.TreeUtilService
                    .deleteNode(node,self.principalTree.tree)
                    .then(function() {

                        //First we have to check if we have deleted the selected node
                        if(self.principalTree.selectedNode) {
                            var selNode = self.TreeUtilService.getNode(self.principalTree.selectedNode.id,self.principalTree.tree);
                            if (!selNode) {
                                delete self.principalTree.selectedNode;
                            }
                        }


                        //finally we have to clean the expandedNodes
                        var arrayOfNode = self.TreeUtilService.flatFolders(self.principalTree.tree);
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

        self.addHelpFiles = function() {
            // First we check the name of the folder who contains We will contain the files
            self.$translate('HELP_FOLDER')
                .then(function (translation) {
                    // then we find and delete the previous folder and its content
                    var folderHelp = self.TreeUtilService.findNodeByName(self.principalTree.tree, translation);

                    if (folderHelp) {
                        self.TreeUtilService.deleteNode(folderHelp, self.principalTree.tree);
                    }

                    //And finally we create a new folder and import all the files in
                    self.addFolder(translation,self.principalTree.tree)
                        .then(function(node) {

                            var files = fs.readdirSync('./languages');
                            var helpFiles = files.filter(function(item) {
                                return item.startsWith('help');
                            });

                            helpFiles.forEach(function(filename) {
                                var file = fs.readFileSync('./languages/' + filename,'utf8');

                                self.DocumentsService
                                    .addDocument(self.principalTree.tree.defaultCss, filename, file)
                                    .then(function(newDoc) {

                                        var newNode = {
                                            id: newDoc._id,
                                            name: newDoc.title,
                                            leaf: true
                                        };

                                        node.children.push(newNode);
                                        self.principalTree.selectedNode = newNode;
                                        self.save();
                                    })
                                    .catch(function(err ){
                                        console.error(err);
                                    });
                            });
                        })
                        .catch(function(err) {
                            console.error(err);
                        });


            });

        };


        return self;

    }
}());