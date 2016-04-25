(function () {
    "use strict";

    var _ = require('lodash');


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


        return self;
        
    }
    
}());
