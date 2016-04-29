(function () {
    "use strict";

    var _ = require('lodash');
    var uuid = require('node-uuid');


    angular
        .module('Natao')
        .service('TreeUtilService', TreeUtilService)
        .run(run);

    //Start of the service
    function run() {
    }

    //Service itself
    function TreeUtilService() {
        
        
        //Give all the ids of subfolder of the node in an array
        //this method don't return anything but change the arrayOfIds
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
        
        //return the number of nodes inside a node
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

        //Method to find the parent of a node
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

        self.isParent = function(node,nodeParent) {
            var parent = self.findParent(node,nodeParent);
            return parent != null;
        };

        self.getNode = function(nodeId,node) {
            var nodeFound = null;
            if (node.id === nodeId) {
                nodeFound = node;
            } else {
                if (!node.leaf && node.children && node.children.length > 0) {
                    node.children.forEach(function(item) {
                        var nodeInSearch = self.getNode(nodeId,item,nodeFound);
                        if (nodeInSearch) {
                            nodeFound = nodeInSearch;
                        }
                    });
                }
            }
            return nodeFound;

        };

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

        //Inventory of all documents in a structure
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
        

        self.isFirstChild = function(node,nodeRoot) {
            var parent = self.findParent(node,nodeRoot);
            return parent && parent.children && parent.children.indexOf(node) === 0;
        };


        self.pasteNodefolder = function(nodeDestinationParent, nodeSource, jobDone, start) {
            
            if (start && typeof start == 'function') {
                start();
            }

            var nodeToGo = {};
            angular.copy(nodeSource,nodeToGo);

            self.changeIds(nodeToGo);

            nodeDestinationParent.children.push(nodeToGo);

            if (jobDone && typeof jobDone == 'function'){
                jobDone();
            }
        };
        
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

        self.moveBefore = function(nodeToMove,nodeAfter,nodeRoot) {
            
            var parentDestination = self.findParent(nodeAfter,nodeRoot);

            if (!self.isParent(parentDestination,nodeToMove) && nodeToMove !== parentDestination) {
                var parentSource = self.findParent(nodeToMove,nodeRoot);
                var positionSource = parentSource.children.indexOf(nodeToMove);
                var positionAfter = parentDestination.children.indexOf(nodeAfter);
                
                var nodeMove = {};
                angular.copy(nodeToMove,nodeMove);
                self.changeIds(moveNode);

                if (positionAfter === 0) {
                    parentDestination.children.unshift(nodeMove);
                } else {
                    parentDestination.children.splice(positionAfter,0,nodeMove);
                }

                //delete from the origin
                parentSource.children.splice(positionSource,1);
            }

        };

        self.moveAfter = function(nodeToMove,nodeBefore,nodeRoot) {
            
            
            var parentDestination = self.findParent(nodeBefore,nodeRoot);

            if (!self.isParent(parentDestination,nodeToMove) && nodeToMove !== parentDestination) {
                var parentSource = self.findParent(nodeToMove,nodeRoot);
                var positionSource = parentSource.children.indexOf(nodeToMove);
                var positionBefore = parentDestination.children.indexOf(nodeBefore);

                var nodeMove = {};
                angular.copy(nodeToMove,nodeMove);
                self.changeIds(moveNode);

                if (positionBefore === parentDestination.children.length - 1) {
                    parentDestination.children.push(nodeMove);
                } else {
                    parentDestination.children.splice(positionBefore + 1,0,nodeMove);
                }

                //delete from the origin
                parentSource.children.splice(positionSource,1);
            }

        };
        
        self.moveIn = function(nodeToMove,nodeMoveIn,nodeRoot) {

            if (!self.isParent(nodeMoveIn,nodeToMove) && nodeMoveIn !== nodeToMove) {
                var parentSource = self.findParent(nodeToMove,nodeRoot);
                var positionSource = parentSource.children.indexOf(nodeToMove);

                var nodeMove = {};
                angular.copy(nodeToMove,nodeMove);
                self.changeIds(moveNode);

                if (!nodeMoveIn.leaf && nodeMoveIn.children) {
                    nodeMoveIn.children.push(moveNode);
                }

                //delete from the origin
                parentSource.children.splice(positionSource,1);
            }

        };
        

        self.deleteNode = function(node,nodeRoot) {

            var parent = self.findParent(node,nodeRoot);

            if (parent.children && parent.children.length > 0) {
                var indexOfNode = _.findIndex(parent.children,{id:node.id});
                if (indexOfNode >=0) {
                    parent.children.splice(indexOfNode,1);
                }
            }
        };
        


        return self;
        
    }
    
}());
