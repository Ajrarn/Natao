(function () {
    "use strict";

    var _ = require('lodash');
    var uuid = require('node-uuid');
    var fs = require('fs');


    angular
        .module('Natao')
        .service('TreeUtilService', TreeUtilService)
        .run(run);

    //Start of the service
    function run() {
    }

    //Service itself
    function TreeUtilService(DocumentsService,$q,AppStateService,CssService) {

        var self = this;
        self.DocumentsService = DocumentsService;
        self.$q = $q;
        self.AppStateService = AppStateService;
        self.CssService = CssService;

        /**
         * Give all the ids of subfolder of the node in an array
         * this method don't return anything but change the arrayOfIds
         * @param node
         * @param arrayOfIds
         */
        self.allSubFoldersIds = function(node,arrayOfIds) {
            if (node) {
                if(!arrayOfIds) {
                    arrayOfIds = [];
                }
                if (!node.leaf) {
                    arrayOfIds.push(node.id);
                    if (node.children && node.children.length > 0) {
                        node.children.forEach(function(item) {
                            self.allSubFoldersIds(item,arrayOfIds);
                        });
                    }
                }
            }
        };

        /**
         * return the number of nodes inside a node
         * @param node
         * @returns {number}
         */
        self.howManyNodes = function(node) {
            if (node.leaf || node.children.length === 0) {
                return 1;
            } else {
                var nbNode = 1;
                node.children.forEach(function(item) {
                    nbNode = nbNode + self.howManyNodes(item);
                });
                return nbNode;
            }
        };

        /**
         * Method to find the parent of a node
         * @param node
         * @param nodeParent
         * @returns {*}
         */
        self.findParent = function(node, nodeParent) {

            if (nodeParent.leaf) {
                return null;
            } else {
                var item = _.find(nodeParent.children,{id:node.id});
                if (item) {
                    return nodeParent;
                } else {
                    var result = null;
                    for(var i=0; result == null && i < nodeParent.children.length; i++){
                        if (!nodeParent.children[i].leaf) {
                            result = self.findParent(node,nodeParent.children[i]);
                        }
                    }
                    return result;
                }
            }
        };

        /**
         * retrurn true if nodeParent is the direct parent of node
         * @param node
         * @param nodeParent
         * @returns {boolean}
         */
        self.isParent = function(node,nodeParent) {
            var parent = self.findParent(node,nodeParent);
            return parent != null;
        };

        /**
         * get a node in a tree from it's id
         * @param nodeId
         * @param nodeParent
         * @returns {*}
         */
        self.getNode = function(nodeId,nodeParent) {
            var nodeFound = null;
            if (nodeParent.id === nodeId) {
                nodeFound = nodeParent;
            } else {
                if (!nodeParent.leaf && nodeParent.children && nodeParent.children.length > 0) {
                    nodeParent.children.forEach(function(item) {
                        var nodeInSearch = self.getNode(nodeId,item);
                        if (nodeInSearch) {
                            nodeFound = nodeInSearch;
                        }
                    });
                }
            }
            return nodeFound;

        };

        /**
         * returns an array with the folders in an node
         * @param node
         * @returns {*}
         */
        self.flatFolders = function(node) {
            if (!node.leaf) {
                var arrayFolder = [node];
                if (node.children && node.children.length > 0) {
                    node.children.forEach(function(item) {
                        arrayFolder =  _.union(arrayFolder,self.flatFolders(item));
                    });
                }
                return arrayFolder;
            } else {
                return [];
            }
        };

        /**
         * Inventory of all documents in a structure
         * @param node
         * @returns {*}
         */
        self.documentsInStructure = function(node) {
            if (!node.leaf) {
                var arrayDocuments = [];
                if (node.children && node.children.length > 0) {
                    node.children.forEach(function(item) {
                        arrayDocuments =  _.union(arrayDocuments,self.documentsInStructure(item));
                    });
                }
                return arrayDocuments;
            } else {
                return [node];
            }
        };

        /**
         * return true if node is the first child of nodeRoot
         * @param node
         * @param nodeRoot
         * @returns {boolean}
         */
        self.isFirstChild = function(node,nodeRoot) {
            var parent = self.findParent(node,nodeRoot);
            return parent && parent.children && parent.children.indexOf(node) === 0;
        };

        /**
         * change Ids deeply in a node
         * @param node
         */
        self.changeIds = function(node) {

            if (!node.leaf) {
                node.id = uuid.v4();

                if(node.children && node.children.length > 0) {
                    node.children.forEach(function(item) {
                        self.changeIds(item);
                    });
                }
            }

        };

        /**
         * This function return a buffer with the node to copy/cut with all the documents it contains
         * @param node
         * @returns {*}
         */
        self.nodeToBuffer = function(node) {

            //First we proceed with a copy of the node
            var nodeInBuffer = {};
            angular.copy(node,nodeInBuffer);


            return self.$q(function(resolve,reject) {
                var buffer = {
                    node: nodeInBuffer,
                    documents : []
                };

                // we copy all documents in documents array
                // and resolve only when all documents are in the buffer
                var listDocs = self.documentsInStructure(node);

                if (listDocs && listDocs.length > 0) {
                    var nbDocsPending = listDocs.length;
                    listDocs.forEach(function(item) {
                        self.DocumentsService
                            .findDocument(item.id)
                            .then(function(docs) {
                                buffer.documents = _.union(buffer.documents,docs);
                                nbDocsPending--;
                                if (nbDocsPending === 0) {
                                    resolve(buffer);
                                }
                            })
                            .catch(function(err) {
                                reject(err);
                            });
                    });
                } else {
                    resolve(buffer);
                }
            });
        };

        /**
         * this method return a node from a buffer
         * @param buffer
         * @returns {*}
         */
        self.bufferToNode = function(buffer) {

            return self.$q(function(resolve,reject) {
                //First we proceed with a copy of the node required
                var nodeToReturn = {};
                angular.copy(buffer.node,nodeToReturn);

                self.changeIds(nodeToReturn);

                //then we have to copy all documents in the buffer by content, so new documents
                // but we have to keep the change of Ids
                if (buffer.documents && buffer.documents.length > 0) {
                    var nbDocsPending = buffer.documents.length;
                    buffer.documents.forEach(function(item) {

                        //For each document we find the node that represent it in the tree
                        var nodeDoc = self.getNode(item._id,nodeToReturn);

                        //we delete the previous Id
                        delete item._id;

                        // and the insert the new Doc
                        self.DocumentsService
                            .insertDocument(item)
                            .then(function(doc) {

                                nodeDoc.id = doc._id;

                                nbDocsPending--;
                                if (nbDocsPending === 0) {
                                    resolve(nodeToReturn);
                                }

                            })
                            .catch(function(err) {
                                reject(err);
                            });

                    });
                } else {
                    resolve(nodeToReturn);
                }
            });
        };

        /**
         * this method return a buffer from a file
         * @param fileName
         */
        self.fileToBuffer = function(fileName) {

            var extensionFile = fileName.split('.')[1];

            switch (extensionFile) {
                case 'md':
                    return self.markdownFileToBuffer(fileName);
                    break;
                default:
                    return self.jsonFileToBuffer(fileName);
            }

        };

        /**
         * this method return a buffer from a file in markdown
         * @param fileName
         * @returns {*}
         */
        self.markdownFileToBuffer = function(fileName) {
            return self.$q(function(resolve,reject) {
                self.AppStateService.startWrite();
                fs.readFile(fileName,'utf8',function(err,data) {
                    self.AppStateService.stopWrite();
                    if (err) {
                        reject(err);
                    } else {
                        var path = fileName.split('.')[0].split('/');
                        var nameFile = path[path.length - 1];

                        var buffer = {
                            node: {
                                id: nameFile,
                                name: nameFile,
                                leaf: true
                            },
                            documents: [
                                {
                                    _id: nameFile,
                                    docName: 'markdown',
                                    title: nameFile,
                                    created: new Date(),
                                    css: self.CssService.defaultCss._id,
                                    md: data

                                }
                            ]};

                        resolve(buffer);
                    }
                });
            });
        };

        /**
         * this method return a buffer from a file in json
         * @param fileName
         * @returns {*}
         */
        self.jsonFileToBuffer = function(fileName) {
            return self.$q(function(resolve,reject) {
                self.AppStateService.startWrite();
                fs.readFile(fileName,'utf8',function(err,data) {
                    self.AppStateService.stopWrite();
                    if (err) {
                        reject(err);
                    } else {
                        try {
                            var buffer = JSON.parse(data);
                            self.transformDatesInBuffer(buffer);
                            resolve(buffer);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }
                });
            });
        };

        /**
         * this method write in fil from a buffer
         * @param buffer
         * @param fileName
         */
        self.bufferToFile = function(buffer,fileName) {

            var extensionFile = fileName.split('.')[1];

            switch (extensionFile) {
                case 'md':
                    return self.bufferToMarkdownFile(buffer,fileName);
                    break;
                default:
                    return self.bufferToJsonFile(buffer,fileName);
            }


        };

        /**
         * this method write in a markdown file from buffer
         * @param buffer
         * @param fileName
         * @returns {*}
         */
        self.bufferToMarkdownFile = function(buffer,fileName) {

            return self.$q(function(resolve,reject) {
                self.AppStateService.startWrite();
                if (fs.existsSync(fileName)) {
                    fs.unlinkSync(fileName);
                }

                fs.writeFile(fileName, buffer.documents[0].md, 'utf8', function(err) {
                    self.AppStateService.stopWrite();
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });

            });
        };

        /**
         * this method write in a json file from buffer
         * @param buffer
         * @param fileName
         * @returns {*}
         */
        self.bufferToJsonFile = function(buffer,fileName) {

            return self.$q(function(resolve,reject) {
                self.AppStateService.startWrite();
                if (fs.existsSync(fileName)) {
                    fs.unlinkSync(fileName);
                }

                fs.writeFile(fileName, JSON.stringify(buffer), 'utf8', function(err) {
                    self.AppStateService.stopWrite();
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });

            });
        };

        /**
         * transform the date in strin from the buffer in javascript date
         * @param buffer
         */
        self.transformDatesInBuffer = function(buffer) {
            buffer.documents.forEach(function (doc) {
                doc.created = new Date(doc.created);
            });
        };

        /**
         * move a nodeToMove before a nodeAfter in nodeRoot tree
         * @param nodeToMove
         * @param nodeAfter
         * @param nodeRoot
         */
        self.moveBefore = function(nodeToMove,nodeAfter,nodeRoot) {

            var parentDestination = self.findParent(nodeAfter,nodeRoot);

            if (!self.isParent(parentDestination,nodeToMove) && nodeToMove !== parentDestination) {
                var parentSource = self.findParent(nodeToMove,nodeRoot);
                var positionSource = parentSource.children.indexOf(nodeToMove);
                var positionAfter = parentDestination.children.indexOf(nodeAfter);

                //To make copy without errors we wil pass it in the buffer and the return a node
                self.nodeToBuffer(nodeToMove)
                    .then(function(buffer) {

                        //we can delete the original when the copy is in the buffer
                        parentSource.children.splice(positionSource,1);

                        self.bufferToNode(buffer)
                            .then(function(node) {

                                //when we have the new safe node we move the copy in the right place
                                if (positionAfter === 0) {
                                    parentDestination.children.unshift(node);
                                } else {
                                    parentDestination.children.splice(positionAfter,0,node);
                                }

                            })
                            .catch(function(err) {
                                console.error(err);
                            });

                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }

        };

        /**
         * move a nodeToMove after a nodeBefore in nodeRoot tree
         * @param nodeToMove
         * @param nodeBefore
         * @param nodeRoot
         */
        self.moveAfter = function(nodeToMove,nodeBefore,nodeRoot) {


            var parentDestination = self.findParent(nodeBefore,nodeRoot);

            if (!self.isParent(parentDestination,nodeToMove) && nodeToMove !== parentDestination) {
                var parentSource = self.findParent(nodeToMove,nodeRoot);
                var positionSource = parentSource.children.indexOf(nodeToMove);
                var positionBefore = parentDestination.children.indexOf(nodeBefore);

                //To make copy without errors we wil pass it in the buffer and the return a node
                self.nodeToBuffer(nodeToMove)
                    .then(function(buffer) {

                        //we can delete the original when the copy is in the buffer
                        parentSource.children.splice(positionSource,1);

                        self.bufferToNode(buffer)
                            .then(function(node) {

                                //when we have the new safe node we move the copy in the right place
                                if (positionBefore === parentDestination.children.length - 1) {
                                    parentDestination.children.push(node);
                                } else {
                                    parentDestination.children.splice(positionBefore + 1,0,node);
                                }

                            })
                            .catch(function(err) {
                                console.error(err);
                            });

                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }

        };

        /**
         * move a nodeToMove into a nodeMoveIn in nodeRoot tree
         * @param nodeToMove
         * @param nodeMoveIn
         * @param nodeRoot
         */
        self.moveIn = function(nodeToMove,nodeMoveIn,nodeRoot) {

            if (!self.isParent(nodeMoveIn,nodeToMove) && nodeMoveIn !== nodeToMove) {
                var parentSource = self.findParent(nodeToMove,nodeRoot);
                var positionSource = parentSource.children.indexOf(nodeToMove);

                //To make copy without errors we wil pass it in the buffer and the return a node
                self.nodeToBuffer(nodeToMove)
                    .then(function(buffer) {

                        //we can delete the original when the copy is in the buffer
                        parentSource.children.splice(positionSource,1);

                        self.bufferToNode(buffer)
                            .then(function(node) {

                                //when we have the new safe node we move the copy in the right place
                                if (!nodeMoveIn.leaf && nodeMoveIn.children) {
                                    nodeMoveIn.children.push(node);
                                }

                            })
                            .catch(function(err) {
                                console.error(err);
                            });

                    })
                    .catch(function(err) {
                        console.error(err);
                    });

            }

        };


        /**
         * this function effectively delete the node and all documents attached
         * it will be only use in the trash
         * for the principal tree the erase function will delete the node and preserve the documents
         * @param node
         * @param nodeRoot
         * @returns {*}
         */
        self.deleteNode = function(node,nodeRoot) {

            return self.$q(function(resolve,reject) {

                if (node.leaf) {
                    // If it's a document we have to delete it first from the markdown collection
                    self.DocumentsService
                        .deleteDocument(node.id)
                        .then(function () {

                            //now we will delete it from the tree
                            var parent = self.findParent(node,nodeRoot);
                            if (parent.children && parent.children.length > 0) {
                                var indexOfNode = _.findIndex(parent.children,{id:node.id});
                                if (indexOfNode >=0) {
                                    parent.children.splice(indexOfNode,1);
                                }
                            }
                            resolve();
                        })
                        .catch(function(err) {
                            reject(err);
                        });
                } else {
                    //If it's a folder we have to find all his documents in itself
                    var documents = self.documentsInStructure(node);
                    var nbDocsPending = documents.length;

                    if (nbDocsPending > 0) {
                        //and then delete all the documents
                        documents.forEach(function(document) {

                            self.DocumentsService
                                .deleteDocument(document.id)
                                .then(function() {
                                    nbDocsPending--;
                                    if (nbDocsPending === 0) {
                                        // In all case we have to delete it from the tree
                                        var parent = self.findParent(node,nodeRoot);

                                        if (parent.children && parent.children.length > 0) {
                                            var indexOfNode = _.findIndex(parent.children,{id:node.id});
                                            if (indexOfNode >=0) {
                                                parent.children.splice(indexOfNode,1);
                                            }
                                        }
                                        resolve();
                                    }
                                })
                                .catch(function(err) {
                                    reject(err);
                                });
                        });
                    } else {
                        // In all case we have to delete it from the tree
                        var parent = self.findParent(node,nodeRoot);

                        if (parent.children && parent.children.length > 0) {
                            var indexOfNode = _.findIndex(parent.children,{id:node.id});
                            if (indexOfNode >=0) {
                                parent.children.splice(indexOfNode,1);
                            }
                        }
                        resolve();
                    }

                }
            });
        };

        /**
         * this function only delete the node but not the documents attached
         * for the principal tree
         * @param node
         * @param nodeRoot
         * @returns {*}
         */
        self.eraseNode = function(node,nodeRoot) {
            return self.$q(function(resolve) {
                var parent = self.findParent(node,nodeRoot);
                if (parent.children && parent.children.length > 0) {
                    var indexOfNode = _.findIndex(parent.children,{id:node.id});
                    if (indexOfNode >=0) {
                        parent.children.splice(indexOfNode,1);
                    }
                }
                resolve();
            });
        };


        /**
         * search a node by it's name
         * @param node
         * @param name
         * @returns {*}
         */
        self.findNodeByName = function(node, name) {
            var nodeFound = null;
            if (node.name === name) {
                nodeFound = node;
            } else {
                if (node.children && node.children.length > 0) {
                    node.children.forEach(function(item) {
                        var nodeInSearch = self.findNodeByName(item, name);
                        if (nodeInSearch) {
                            nodeFound = nodeInSearch;
                        }
                    });
                }
            }
            return nodeFound;
        };

        /**
         * get the nodes id to make a path from a node to another
         * @param nodeFrom
         * @param nodeTo
         * @returns {*}
         */
        self.getPath = function(nodeFrom, nodeTo) {
            var path = [];

            if (nodeFrom.id !== nodeTo.id && nodeFrom.children) {
               for (var index = 0; path.length === 0 && index < nodeFrom.children.length; index++) {

                   if (nodeFrom.children[index].id === nodeTo.id) {
                       path = [nodeFrom.id];
                   } else {
                       path = self.getPath(nodeFrom.children[index], nodeTo);
                       if (path.length > 0) {
                           path.unshift(nodeFrom.id);
                       }
                   }
                }
           }
            return path;
        };

        /**
         * merge nodeToGet in nodeToReceive
         * it preserves nodes already in nodeToReceive
         * @param nodeToReceive
         * @param nodeToGet
         */
        self.mergeNodes = function(nodeToReceive, nodeToGet) {

            // We have to identify the nodes tha are already in destination
            // and those who just need to be add
            let receiveIds = nodeToReceive.children.map(item => item.id);
            let toGetIds = nodeToGet.children.map(item => item.id);

            let intersectionIds = _.intersection(receiveIds, toGetIds);
            let differenceIds = _.difference(toGetIds, receiveIds);


            // We first treat the intersection to merge it
            if (intersectionIds.length > 0) {
                let nodeToMerges = nodeToGet.children.filter((item) => {
                    return intersectionIds.indexOf(item.id) >= 0;
                });

                nodeToMerges.forEach((node) => {
                    if (!node.leaf) {
                        let nodeInReceiveToMerge = self.getNode(node.id, nodeToReceive);
                        self.mergeNodes(nodeInReceiveToMerge, node);
                    }
                });
            }

            // and then we simply add the others
            if (differenceIds.length > 0) {
                let nodesToAdd = nodeToGet.children.filter((item) => {
                    return differenceIds.indexOf(item.id) >= 0;
                });
                nodesToAdd.forEach((node) => {
                    nodeToReceive.children.push(node);
                });
            }


        };


        return self;

    }

}());
