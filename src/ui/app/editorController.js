(function () {
    "use strict";

    var uuid = require('node-uuid');

    angular
        .module('Natao')
        .controller('EditorController', EditorController);


    function EditorController($showdown,$timeout,PreferencesService,PrincipalTreeService,focus) {
        console.log('EditorController');

        var self = this;
        self.$showdown = $showdown;
        self.$timeout = $timeout;
        self.PreferencesService = PreferencesService;
        self.PrincipalTreeService = PrincipalTreeService;
        self.PrincipalTreeService.init();
        self.$showdown.setOption('tables',true);
        self.$showdown.setOption('strikethrough',true);
        self.inPrint = false;
        self.focus = focus;


        self.refresh = function() {
            self.PrincipalTreeService.saveCurrent();
        };

        self.offPrint = function() {
            self.inPrint = false;
        };

        self.showVisualizer = function() {
            return self.PrincipalTreeService.currentMarkdown && self.PreferencesService.preferences.showVisualiser;
        };

        self.showEditor = function() {
            return self.PrincipalTreeService.currentMarkdown && self.PreferencesService.preferences.showEditor;
        };

        self.print = function() {
            self.inPrint = true;
            setTimeout(window.print, 1050);       //without angular $digest
            self.$timeout(self.offPrint, 1150);  //with angular $digest
        };

        self.openClassPopover = function() {
            self.newClass = null;
            self.focus('newClassName');
        };


        self.addClassPopover = function(hide){
            if (self.newClass && self.newClass !== '') {
                self.PrincipalTreeService.addClass(self.newClass);
            }
            hide();
        };


        // -------------------Folder Popover -----------------

        // the possible values of folderPopover are ['buttonBar','edit','addFolder','addDocument','delete']

        self.openFolderPopover = function(node) {
            self.currentNode = node;
            self.newNameFolder = node.name;
            self.folderPopover = 'buttonBar';
            console.log('disabled',self.pasteButtonDisabled());
        };

        self.pasteButtonDisabled = function() {
            return !(self.PrincipalTreeService.principalTree.bufferTreeCopy  && self.PrincipalTreeService.docsPendingForBuffer === 0);
        };

        self.editFolder = function() {
            self.folderPopover = 'edit';
            self.focus('folderName');

        };

        self.openAddFolder = function() {
            self.newFolderName = null;
            self.folderPopover = 'addFolder';
            self.focus('addFolderName');
        };

        self.openAddDocument = function() {
            self.folderPopover = 'addDocument';
            self.newDocumentName = null;
            self.focus('addDocumentName');
        };

        self.OpenDelete = function() {
            self.folderPopover = 'delete';
            self.cancel = false;
        };

        self.cancelDelete = function() {
            self.cancel = true;
        };

        self.submitFolderPopover = function(hide){
            switch (self.folderPopover) {
                case 'edit':
                    self.saveFolder();
                    break;
                case 'addFolder':
                    self.addFolder();
                    break;
                case 'addDocument':
                    self.addDocument();
                    break;
                case 'delete':
                    if (!self.cancel) {
                        self.PrincipalTreeService.deleteNode(self.currentNode);
                    }
                    break;
                default: break;
            }
            hide();
        };

        self.copyFolder = function(hide) {
            self.PrincipalTreeService.copyNodeFolder(self.currentNode);
            hide();
        };

        self.cutFolder = function(hide) {
            self.PrincipalTreeService.cutNodefolder(self.currentNode);
            hide();
        };

        self.pasteFolder = function(hide) {
            if (hide) {
                self.PrincipalTreeService.pasteBufferToNode(self.currentNode);
                hide();
            } else {
                //it's done without selecting a node so the node will be the tree himself
                self.PrincipalTreeService.pasteBufferToNode(self.PrincipalTreeService.principalTree.tree);
            }
        };


        self.addFolder = function() {
            if (self.newFolderName && self.newFolderName.length > 0) {
                self.PrincipalTreeService.addFolder(self.newFolderName, self.currentNode);
            }
        };

        self.saveFolder = function() {
            if (self.newNameFolder && self.newNameFolder.length > 0) {
                self.currentNode.name = self.newNameFolder;
                self.PrincipalTreeService.save();
            }
        };

        self.addDocument = function() {
            if (self.newDocumentName && self.newDocumentName.length > 0) {
                self.PrincipalTreeService.addMarkdown(self.currentNode,self.newDocumentName);
            }
        };

    }

}());