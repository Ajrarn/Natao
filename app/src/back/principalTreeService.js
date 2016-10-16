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
    function PrincipalTreeService(TreeUtilService,TemplateTreeService,$q,PendingService,$translate,DatabaseService,DocumentsService,$rootScope) {

        var self = this;
        self.TreeUtilService = TreeUtilService;
        self.TemplateTreeService = TemplateTreeService;
        self.PendingService = PendingService;
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

        self.initWatch = true;
        // if we do the save on the select node, the selected node is not yet set
        //so we have to watch it
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

                self.DatabaseService.find({docName:'PrincipalTree'})
                    .then(function(docs){
                        if (docs.length === 0) {

                            self.principalTree.tree.defaultCss = defaultCss._id;

                            self.DatabaseService
                                .save(self.principalTree)
                                .then(function(newDoc) {
                                    self.principalTree = newDoc;

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
                                                        console.error(err);
                                                    });

                                            })
                                            .catch(function(err) {
                                                console.error(err);
                                            });

                                    });

                                })
                                .catch(function(err) {
                                    reject(err);
                                });

                        } else {
                            self.principalTree = docs[0];
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
                .save(self.principalTree)
                .then(function(doc) {
                    self.PendingService.stop();
                    self.principalTree = doc;
                })
                .catch(function(err) {
                    self.PendingService.stop();
                    console.error('error:', err);
                });
        };

        /**
         * save in a promise to chain different saves
         * @returns {*}
         */
        self.saveAndWait = function() {
            return self.$q(function(resolve,reject) {
                self.PendingService.start();

                self.DatabaseService
                    .save(self.principalTree)
                    .then(function(doc) {
                        self.PendingService.stop();
                        self.principalTree = doc;
                        resolve();
                    })
                    .catch(function(err) {
                        self.PendingService.stop();
                        reject(err);
                    });
            });
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