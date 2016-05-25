(function () {
    "use strict";

    var uuid = require('node-uuid');

    angular
        .module('Natao')
        .controller('EditorController', EditorController);


    function EditorController($timeout,PreferencesService,PrincipalTreeService,TreeUtilService,CssService,TemplateTreeService,focus,fileDialog,$location,PendingService,DocumentsService,$rootScope,$translate) {
        console.log('EditorController');

        var self = this;
        //self.$showdown = $showdown;
        self.$timeout = $timeout;
        self.PreferencesService = PreferencesService;
        self.PrincipalTreeService = PrincipalTreeService;
        self.TreeUtilService = TreeUtilService;
        self.CssService = CssService;
        self.TemplateTreeService = TemplateTreeService;
        self.PendingService = PendingService;
        self.DocumentsService = DocumentsService;
        self.$rootScope = $rootScope;
        self.fileDialog = fileDialog;
        self.$location = $location;
        self.$translate = $translate
        self.inPrint = false;
        self.focus = focus;
        self.editorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            mode: 'gfm'
        };
        self.buffer = null;
        self.buttonTextActive = false;

        //Init of the current Markdown
        if (self.PrincipalTreeService.principalTree.currentMarkdownId) {
            self.DocumentsService
                .findDocument(self.PrincipalTreeService.principalTree.currentMarkdownId)
                .then(function(docs) {
                    self.currentMarkdown = docs[0];
                    self.CssService.initCurrentById(self.currentMarkdown.css);
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                }).catch(function(err) {
                console.log(err);
            });
        }

        // to ensure that the <a href> wil open in a browser not in Natao
        // We have to watch the current markdown and force the behavior of all <a href>
        self.$rootScope.$watch(function(){
            return self.currentMarkdownCode;
        },function() {
            self.$timeout(function() {
                $('a').on('click', function(){
                    require('nw.gui').Shell.openExternal( this.href );
                    return false;
                });
            },0,false);
        });


        //catch after editor loaded
        self.codeMirrorLoaded = function(editor) {
            self.codeMirror = editor;

            //This will synchronize the 2 scrollbar
            var elements = $('.CodeMirror-vscrollbar');
            //var avgScroll = 0;
            var ratioTop = 0;
            elements.on('scroll', function(e){

                if (self.PreferencesService.preferences.syncScroll) {
                    if (e.isTrigger){
                        //e.target.scrollTop = Math.round(avgScroll * e.target.scrollHeight - e.target.clientHeight / 2);
                        e.target.scrollTop = Math.round((e.target.scrollHeight - e.target.clientHeight) * ratioTop);
                    }else {
                        //avgScroll = (e.target.scrollTop + e.target.clientHeight / 2) / e.target.scrollHeight;
                        ratioTop = e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight);

                        elements.each(function (element) {
                            if( !this.isSameNode(e.target) ){
                                $(this).trigger('scroll');
                            }
                        });
                    }
                }
            });
            
        };

        
        self.refresh = function() {
            // to avoid save too frequent with autosave at each change, we use a timeout at 1s.
            //each time this function is called, the timeout restart
            if (self.refreshTimeout) {
                clearTimeout(self.refreshTimeout);
            }
            self.refreshTimeout = setTimeout(function() {
                self.refreshTimeout = null;
                self.saveCurrentMarkdown();
                //this one is for the watcher of <a href>
                self.currentMarkdownCode = self.currentMarkdown.md;
            },1000);

        };

        self.refreshMath = function() {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        };


        self.saveCurrentMarkdown = function() {

            if (self.currentMarkdown) {
                self.CssService.initCurrentById(self.currentMarkdown.css);

                self.DocumentsService
                    .updateDocument(self.currentMarkdown)
                    .then(function(doc) {
                        self.PrincipalTreeService.principalTree.selectedNode.name = doc.title;

                        self.PrincipalTreeService.save();
                        setTimeout(self.refreshMath, 100);  //without angular $digest
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }
        };

        self.selectNode = function(node) {
            if (node.leaf) {
                if ( !self.PrincipalTreeService.principalTree.currentMarkdownId || (self.PrincipalTreeService.principalTree.currentMarkdownId && node.id !== self.currentMarkdownId)) {

                    self.DocumentsService
                        .findDocument(node.id)
                        .then(function(docs){
                            if (docs && docs.length > 0){
                                self.currentMarkdown = docs[0];
                                //this one is for the watcher of <a href>
                                self.currentMarkdownCode = self.currentMarkdown.md;
                                self.CssService.initCurrentById(self.currentMarkdown.css);
                                self.PrincipalTreeService.principalTree.currentMarkdownId = self.currentMarkdown._id;
                                self.PrincipalTreeService.save();

                                setTimeout(self.refreshMath, 100);  //without angular $digest
                            }
                        })
                        .catch(function(err){
                            console.error(err);
                        });
                }
            }
        };

        //select current selected node if necessary
        if(self.PrincipalTreeService && self.PrincipalTreeService.principalTree && self.PrincipalTreeService.principalTree.selectedNode) {
            self.selectNode(self.PrincipalTreeService.principalTree.selectedNode);
        }

        self.offPrint = function() {
            self.inPrint = false;
        };

        self.showViewer = function() {
            return self.currentMarkdown && self.PreferencesService.preferences.showViewer;
        };

        self.showEditor = function() {
            return self.currentMarkdown && self.PreferencesService.preferences.showEditor;
        };

        self.print = function() {
            self.PreferencesService.preferences.showViewer = true;
            self.inPrint = true;
            setTimeout(window.print, 1050);       //without angular $digest
            self.$timeout(self.offPrint, 1150);  //with angular $digest
        };

        self.openClassPopover = function() {
            self.newClass = null;
            self.templateName = null;
            self.focus('newClassName');
        };


        self.addClassPopover = function(hide){
            if (self.newClass && self.newClass !== '') {
                self.PrincipalTreeService.addFolder(self.newClass,null,self.templateName);
            }
            hide();
        };
        
        


        // -------------------Folder Popover -----------------

        // the possible values of folderPopover are ['buttonBar','edit','addFolder','addDocument','delete','saveTemplate']
        
        self.changeButtonText = function(message) {
            if (message && message.length > 0) {
                self.buttonTextActive = true;
                self.$translate(message).then(function (translation) {
                    self.buttonText = translation;
                });
            } else {
                self.buttonTextActive = false;
            }

        };

        self.openFolderPopover = function(node) {
            self.currentNode = node;
            self.newNameFolder = node.name;
            self.newDefaultCss = node.defaultCss;
            self.folderPopover = 'buttonBar';
            self.newColor = node.color;
        };

        self.pasteButtonDisabled = function() {
            return !(self.buffer);
        };

        self.editFolder = function() {
            self.folderPopover = 'edit';
            self.focus('folderName');

        };

        self.openSaveTemplate = function() {
            self.folderPopover = 'saveTemplate';
            self.focus('templateName');
            self.templateName = null;

        };

        self.openAddFolder = function() {
            self.newFolderName = null;
            self.folderPopover = 'addFolder';
            self.templateName = null;
            self.focus('addFolderName');
        };

        self.openAddDocument = function() {
            self.folderPopover = 'addDocument';
            self.newDocumentName = null;
            self.focus('addDocumentName');
        };

        self.openDelete = function() {
            self.folderPopover = 'delete';
            self.cancel = false;
        };

        self.openConfirmTemplate = function() {
            self.folderPopover = 'confirmTemplate';
            self.cancel = false;
        };

        self.cancelAction = function(hide) {
            self.cancel = true;
            hide();
        };

        self.submitFolderPopover = function(hide){
            switch (self.folderPopover) {
                case 'edit':
                    self.saveFolder(hide);
                    break;
                case 'addFolder':
                    self.addFolder(hide);
                    break;
                case 'addDocument':
                    self.addDocument(hide);
                    break;
                case 'saveTemplate':
                    self.saveTemplate(hide);
                    break;
                case 'confirmTemplate':
                    if (!self.cancel) {
                        self.saveForceTemplate(hide);
                    } else {
                        hide();
                    }
                    break;
                case 'delete':
                    if (!self.cancel) {
                        self.PrincipalTreeService
                            .deleteNode(self.currentNode)
                            .catch(function(err) {
                                console.error(err);
                            });
                    }
                    hide();
                    break;
                default: break;
            }
        };

        self.copyFolder = function(hide) {
            self.TreeUtilService
                .nodeToBuffer(self.currentNode)
                .then(function(buffer) {
                    self.buffer = buffer;
                })
                .catch(function(err) {
                    console.error(err);
                });
            hide();
        };

        self.copyDocument = function() {

            var documentNode = self.TreeUtilService.getNode(self.currentMarkdown._id,self.PrincipalTreeService.principalTree.tree);

            self.TreeUtilService
                .nodeToBuffer(documentNode)
                .then(function(buffer) {
                    self.buffer = buffer;
                })
                .catch(function(err) {
                    console.error(err);
                });
        };

        self.cutFolder = function(hide) {
            self.TreeUtilService
                .nodeToBuffer(self.currentNode)
                .then(function(buffer) {
                    self.buffer = buffer;
                    self.deleteNode(self.PrincipalTreeService.principalTree.selectedNode,self.PrincipalTreeService.principalTree.tree);
                })
                .catch(function(err) {
                    console.error(err);
                });
            hide();
        };

        self.cutDocument = function() {

            var documentNode = self.TreeUtilService.getNode(self.currentMarkdown._id,self.PrincipalTreeService.principalTree.tree);

            self.TreeUtilService
                .nodeToBuffer(documentNode)
                .then(function(buffer) {
                    self.buffer = buffer;
                    self.PrincipalTreeService.deleteNode(documentNode,self.PrincipalTreeService.principalTree.tree);
                })
                .catch(function(err) {
                    console.error(err);
                });
        };

        self.deleteDocument = function(hide) {

            var documentNode = self.TreeUtilService.getNode(self.currentMarkdown._id,self.PrincipalTreeService.principalTree.tree);

            self.PrincipalTreeService
                .deleteNode(documentNode,self.PrincipalTreeService.principalTree.tree)
                .then(function() {
                    //and check the selected markdown
                    var selNode = self.TreeUtilService.getNode(self.PrincipalTreeService.principalTree.currentMarkdownId,self.PrincipalTreeService.principalTree.tree);
                    if (!selNode) {
                        self.PrincipalTreeService.principalTree.currentMarkdownId = null;
                        self.PrincipalTreeService.save();
                        self.currentMarkdown = null;
                    }
                })
                .catch(function(err) {
                    console.error(err);
                });
            hide();
        };

        self.exportDocument = function(hide) {

            var defaultFile;
            var accept;

            switch (self.fileFormat) {
                case 'md':
                    defaultFile = self.currentMarkdown.title +'.md';
                    accept = 'text/markdown';
                    break;
                // json is the default file format
                default:
                    defaultFile = self.currentMarkdown.title +'.json';
                    accept = 'application/json';
                    break;
            }

            self.fileFormat = null;


            self.fileDialog.saveAs(function(filename) {

                var documentNode = self.TreeUtilService.getNode(self.currentMarkdown._id,self.PrincipalTreeService.principalTree.tree);

                self.TreeUtilService
                    .nodeToBuffer(documentNode)
                    .then(function(buffer) {
                        self.TreeUtilService
                            .bufferToFile(buffer,filename)
                            .then(function() {
                                console.log('export terminé');
                            }).catch(function(err) {
                            console.error(err);
                        })
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
                
            },defaultFile,accept);

            hide();
        };

        self.pasteFolder = function(hide) {

            if (self.buffer) {
                self.TreeUtilService
                    .bufferToNode(self.buffer)
                    .then(function(node) {
                        if (hide) {
                            // then the paste command is past from the tree
                            if (self.currentNode && self.currentNode.children) {
                                self.currentNode.children.push(node);
                            }
                            hide();
                        } else {
                            //the command was past by the toolbar
                            self.PrincipalTreeService.principalTree.tree.children.push(node);
                        }
                        self.buffer = null;
                        self.PrincipalTreeService.save();

                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }
        };


        self.exportTo = function(hide) {
            self.fileDialog.saveAs(function(filename) {

                self.TreeUtilService
                    .nodeToBuffer(self.PrincipalTreeService.principalTree.selectedNode)
                    .then(function(buffer) {
                        self.TreeUtilService
                            .bufferToFile(buffer,filename)
                            .then(function() {
                                console.log('export terminé');
                            }).catch(function(err) {
                            console.error(err);
                        })
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
                hide();
            },'nataoExport.json','application/json');
        };

        self.importFrom = function(hide) {

            var nodeIn;

            if (hide) {
                nodeIn = self.currentNode;
                hide();
            } else {
                nodeIn = self.PrincipalTreeService.principalTree.tree;
            }

            self.fileDialog.openFile(function(filename) {

                self.TreeUtilService
                    .fileToBuffer(filename)
                    .then(function(buffer) {

                        self.TreeUtilService
                            .bufferToNode(buffer)
                            .then(function(nodeToInsert) {
                                nodeIn.children.push(nodeToInsert);
                                self.expand(nodeIn);
                            })
                            .catch(function(err) {
                                console.error(err);
                            })

                    })
                    .catch(function(err) {
                        console.error(err);
                    })

            }, false,['text/markdown','application/json']);
        };

        self.saveTemplate = function(hide) {
            if (self.templateName && self.templateName.length > 0) {
                if (self.TemplateTreeService.getTemplate(self.templateName)) {
                    self.openConfirmTemplate();
                } else {
                    self.TemplateTreeService.saveTemplate(self.currentNode,self.templateName);
                    hide();
                }
            }
        };

        self.saveForceTemplate = function(hide) {
            self.TemplateTreeService.saveTemplate(self.currentNode,self.templateName);
            hide();
        };


        self.addFolder = function(hide) {
            if (self.newFolderName && self.newFolderName.length > 0) {
                self.PrincipalTreeService
                    .addFolder(self.newFolderName, self.currentNode, self.templateName)
                    .catch(function(err) {
                        console.error(err);
                    });
            }
            hide();
        };

        self.saveFolder = function(hide) {
            if (self.newNameFolder && self.newNameFolder.length > 0) {
                self.currentNode.name = self.newNameFolder;
                self.currentNode.color = self.newColor;
                self.currentNode.defaultCss = self.newDefaultCss;
                self.PrincipalTreeService.save();
            }
            hide();
        };

        self.addDocument = function(hide) {
            if (self.newDocumentName && self.newDocumentName.length > 0) {

                self.DocumentsService
                    .addDocument(self.currentNode.defaultCss,self.newDocumentName)
                    .then(function(newDoc) {
                        var newNode = {
                            id: newDoc._id,
                            name: newDoc.title,
                            leaf: true
                        };

                        self.currentNode.children.push(newNode);
                        self.PrincipalTreeService.principalTree.selectedNode = newNode;
                        self.selectNode(newNode);
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }
            hide();
        };


        /* ************* Drag Drop ********/
        self.handleDrop = function(item, bin) {

            var nodeDrag = self.TreeUtilService.getNode(item,self.PrincipalTreeService.principalTree.tree);
            var nodeDrop = null;

            if (bin.startsWith('before')) {
                nodeDrop = self.TreeUtilService.getNode(bin.replace('before',''),self.PrincipalTreeService.principalTree.tree);
                self.TreeUtilService.moveBefore(nodeDrag,nodeDrop,self.PrincipalTreeService.principalTree.tree);
            } else {
                if (bin.startsWith('after')) {
                    nodeDrop = self.TreeUtilService.getNode(bin.replace('after',''),self.PrincipalTreeService.principalTree.tree);
                    self.TreeUtilService.moveAfter(nodeDrag,nodeDrop,self.PrincipalTreeService.principalTree.tree);
                } else {
                    nodeDrop = self.TreeUtilService.getNode(bin,self.PrincipalTreeService.principalTree.tree);
                    self.TreeUtilService.moveIn(nodeDrag,nodeDrop,self.PrincipalTreeService.principalTree.tree);
                    self.expand(nodeDrop);
                }
            }
        };


        self.expand = function(node) {
            if (self.PrincipalTreeService.principalTree.expandedNodes.indexOf(node) < 0) {
                self.PrincipalTreeService.principalTree.expandedNodes.push(node);
            }
        };

        self.isFirstChild = function(node) {
            return self.TreeUtilService.isFirstChild(node,self.PrincipalTreeService.principalTree.tree);
        };

        self.isExpanded = function(node) {
            return self.PrincipalTreeService.principalTree.expandedNodes && self.PrincipalTreeService.principalTree.expandedNodes.indexOf(node) >= 0;
        };

        self.showAfter = function(node) {
            return !(self.isExpanded(node) && node.children.length > 0);
        };

        /* *********** Editor Setting *************/
        self.changeSpace = function () {
            self.PreferencesService.savePreferences();
            var markdown = self.currentMarkdown;
            self.currentMarkdown = null;

            self.$timeout(function() {
                self.currentMarkdown = markdown;
            },100);

        };
    }

}());