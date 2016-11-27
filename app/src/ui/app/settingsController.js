(function () {
    "use strict";

    var beautify_html = require('js-beautify').html;
    var fs = require('fs');
    var uuid = require('node-uuid');
    var _ = require('lodash');

    angular
        .module('Natao')
        .controller('SettingsController', SettingsController);


    function SettingsController($rootScope,$scope,PreferencesService,DatabaseService,$location,$sce,fileDialog,OnBoardingService, ShowDownUtilService,
                                CssService,DocumentsService,TemplateTreeService,$showdown,focus,$timeout,TreeUtilService,MessageService, PrincipalTreeService) {

        var self = this;

        self.PreferencesService = PreferencesService;
        self.$sce = $sce;
        self.DatabaseService = DatabaseService;
        self.$scope = $scope;
        self.$rootScope = $rootScope;

        self.fileDialog = fileDialog;
        self.CssService = CssService;
        self.DocumentsService = DocumentsService;
        self.TemplateTreeService = TemplateTreeService;
        self.$showdown = $showdown;
        self.focus = focus;
        self.$timeout = $timeout;
        self.TreeUtilService = TreeUtilService;
        self.MessageService = MessageService;
        self.OnBoardingService = OnBoardingService;
        self.PrincipalTreeService = PrincipalTreeService;
        self.ShowDownUtilService = ShowDownUtilService;
        self.MessageService.changeMessage('');
        self.viewer = true;
        self.checkmark = false;
        self.disableDocumentChoice = true;
        self.otherAvailableCss = [];



        self.buffer = null;
        self.nodesPendingPaste = 0;

        //for codeMirror
        self.cssEditorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            mode: 'css',
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            extraKeys: {"Ctrl-Space": "autocomplete"}
        };


        self.htmlEditorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            readOnly: 'nocursor'
        };

        // to ensure that the <a href> wil open in a browser not in Natao
        // We have to watch the current markdown and force the behavior of all <a href>
        self.$rootScope.$watch(function(){
            return self.currentDoc.md;
        },function() {
            self.ShowDownUtilService.showDownHooks();
        });

        /**
         * reset the current doc in the css part
         */
        self.resetCurrentDoc = function() {
            self.currentDoc = {
                md:''
            };
        };
        //init currentDoc
        self.resetCurrentDoc();


        /**
         * this function set the css editor and associate Inlet to it
         * @param editor
         */
        self.setCssEditor = function(editor) {
            self.cssEditor = editor;
            Inlet(editor);
        };

        /**
         * check if a css is valid
         */
        self.settingsValide = function() {
            self.valid = self.PreferencesService.isValid();
        };


        /**
         * save editor preferences
         */
        self.save = function() {
            self.PreferencesService.save();
            $location.path( '/editor' );
        };

        /**
         * set a new database file
         */
        self.newDatabase = function() {
            self.fileDialog.saveAs(function(filename) {
                self.PreferencesService.settings.fileDatabase = filename;
                if (fs.existsSync(filename)) {
                    fs.unlinkSync(filename);
                }
                self.$scope.$apply();
            },'Natao.db',['db']);
        };

        /**
         * choose an existing database file
         */
        self.chooseDatabase = function() {
            self.fileDialog.openFile(function(filename){
                self.PreferencesService.settings.fileDatabase = filename;
                self.PreferencesService.saveSettings();
                self.PreferencesService.init();
            }, false, ['db']);
        };


        /* *************CSS**************** */

        /**
         * save the current css
         */
        self.saveCss = function() {
            if (self.currentCss) {
                self.CssService.initCurrentByContent(self.currentCss.css);
                self.CssService.saveCss(self.currentCss);
            }
        };

        /**
         * change the current html
         */
        self.changeDocument = function() {
            self.currentHTML = self.$showdown.makeHtml(self.currentDoc.md);
            self.allHtml();
        };

        /**
         * change the choice of documents for example
         */
        self.changeDocumentChoice = function() {
            self.resetCurrentDoc();

            self.documentsPromise = self.DocumentsService.getDocumentsByCss(self.currentCss._id);
            self.documentsPromise.then(function(docs) {
                if (!docs || docs.length === 0) {
                    self.documentsPromise = self.DocumentsService.getDocumentsByCss();
                    self.documentsPromise.then(function(docs) {
                        self.documents = docs;
                        self.disableDocumentChoice = false;
                    }).catch((err) => {
                        console.error(err);
                    })
                } else {
                    self.documents = docs;
                    self.disableDocumentChoice = false;
                }
            }).catch((err) => {
                console.error(err);
            });
        };


        /**
         * change the current css
         */
        self.changeCss = function() {
            self.CssService.initCurrentByContent(self.currentCss.css);
            self.focus('cssEditor');

            self.changeDocumentChoice();

            self.otherAvailableCss = self.CssService.otherCss(self.currentCss);
        };

        /**
         * init the popup to add new css
         */
        self.initAddCss= function() {
            self.newCssName = null;
            self.focus('addCssName');
        };

        /**
         * add a new css from the popup add
         * @param hide
         */
        self.addCss = function(hide) {
            self.CssService.addCssNamed(self.newCssName)
                .then(function(res) {
                    self.currentCss = res;
                    self.changeCss();
                })
                .catch(function(err) {
                    console.error(err);
                });
            self.focus('cssEditor');
            hide();
        };

        /**
         * delete a css from the popup delete
         * @param hide
         */
        self.deleteCss = function(hide) {
            self.CssService.deleteCss(self.currentCss, self.currentReplaceCss);
            self.currentCss = null;
            self.resetCurrentDoc();
            self.disableDocumentChoice = true;
            self.CssService.initCurrentByContent('');
            hide();
        };

        /**
         * set the editor read only for the html part
         * @param _editor
         */
        self.editorReadOnly = function(_editor) {
            // Options
            _editor.setReadOnly(true);
        };

        /**
         * generate the html code used in the visualisation
         */
        self.allHtml = function() {

            var completeHtml = '<div flex layout="column" layout-align="start stretch">' +
                '<div id="header" layout="row" layout-align="start stretch">' +
                '<div id="identity" layout="column" layout-align="center center">' +
                '<p>' + self.PreferencesService.preferences.name +'</p>' +
                '<p>' + self.PreferencesService.preferences.firstName +'</p>' +
                '<p>' + self.PreferencesService.preferences.className + '</p>' +
                '</div>' +
                '<div id="title-zone" flex layout="column" layout-align="center center">' +
                '<h1>' + self.currentDoc.title +'</h1>' +
                '<p id="dateCreated">' + self.currentDoc.created + '</p>' +
                '</div>' +
                '</div>' +
                '<div id="separator"></div>' +
                '<div id="content" flex layout="row" layout-align="start stretch">' +
                '<div id="margin"></div>' +
                '<div id="made" flex>'+ self.currentHTML +'</div>' +
                '</div></div>';

            self.currentHtmlAll = beautify_html(completeHtml);
        };


        /**
         * the option tree used in codeMirror
         * @type {{nodeChildren: string, dirSelectable: boolean, injectClasses: {ul: string, li: string, liSelected: string, iExpanded: string, iCollapsed: string, iLeaf: string, label: string, labelSelected: string}, isLeaf: SettingsController.treeOptions.isLeaf}}
         */
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


        /* *************Templates**************** */

        /**
         * save the current template
         */
        self.saveTemplate = function() {
            if (self.currentTemplate) {
                self.TemplateTreeService.saveTemplate(self.currentTemplate);
            }
        };

        /**
         * init the popu to add template
         */
        self.initAddTemplate= function() {
            self.newTemplateName = null;
            self.focus('addTemplateName');
        };

        /**
         * add a template from the popup
         * @param hide
         */
        self.addTemplate = function(hide) {
            self.TemplateTreeService.addTemplate(self.newTemplateName)
                .then(function(res) {
                    self.currentTemplate = res;
                })
                .catch(function(err) {
                    console.error(err);
                });
            hide();
        };

        /**
         * delete a template from the popup
         * @param hide
         */
        self.deleteTemplate = function(hide) {
            self.TemplateTreeService.deleteTemplate(self.currentTemplate);
            self.currentTemplate = null;
            hide();
        };

        /**
         * open th popover with all functionnalities
         * the possible values of folderPopover are ['buttonBar','edit','addFolder','delete']
         * @param node
         */
        self.openFolderPopover = function(node) {
            self.currentNode = node;
            self.newNameFolder = node.name;
            self.newDefaultCss = node.defaultCss;
            self.folderPopover = 'buttonBar';
            self.newColor = node.color;
        };

        /**
         * return true if there is something in the buffer
         * @returns {boolean}
         */
        self.pasteButtonDisabled = function() {
            return !(self.buffer);
        };

        /**
         * the popover in edit mode
         */
        self.editFolder = function() {
            self.folderPopover = 'edit';
            self.focus('folderName');
        };

        /**
         * the popover in add mode
         */
        self.openAddFolder = function() {
            self.newFolderName = null;
            self.folderPopover = 'addFolder';
            self.templateName = null;
            self.focus('addFolderName');
        };

        /**
         * the popover in delete mode
         */
        self.openDelete = function() {
            self.folderPopover = 'delete';
            self.cancel = false;
        };

        /**
         * the popover in confirm mode
         */
        self.openConfirmTemplate = function() {
            self.folderPopover = 'confirmTemplate';
            self.cancel = false;
        };

        /**
         * the cancel action from popover
         * @param hide
         */
        self.cancelAction = function(hide) {
            self.cancel = true;
            hide();
        };

        /**
         * the submit action from popover
         * with different modes
         * @param hide
         */
        self.submitFolderPopover = function(hide){
            switch (self.folderPopover) {
                case 'edit':
                    self.saveFolder(hide);
                    break;
                case 'addFolder':
                    self.addFolder(hide);
                    break;
                case 'delete':
                    if (!self.cancel) {
                        self.deleteNode(self.currentNode);
                    } else {
                        hide();
                    }
                    break;
                default: break;
            }
        };

        /**
         * copy folder in buffer
         * @param hide
         */
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

        /**
         * cut folder in buffer
         * @param hide
         */
        self.cutFolder = function(hide) {

            self.TreeUtilService
                .nodeToBuffer(self.currentNode)
                .then(function(buffer) {
                    self.buffer = buffer;
                    self.deleteNode(self.currentNode);
                })
                .catch(function(err) {
                    console.error(err);
                });

            hide();
        };


        /**
         * paste from buffer
         * @param hide
         */
        self.pasteFolder = function(hide) {

            if (self.buffer) {
                self.TreeUtilService
                    .bufferToNode(self.buffer)
                    .then(function(node) {
                        if (self.currentNode && self.currentNode.children) {
                            self.currentNode.children.push(node);
                            self.buffer = null;
                            self.TemplateTreeService.saveTemplate(self.currentTemplate,self.currentTemplate.name);
                        }
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            }
            hide();

        };

        /**
         * add a new folder from popover
         * @param hide
         */
        self.addFolder = function(hide) {
            if (self.newFolderName && self.newFolderName.length > 0) {
                var newNode = {
                    id: uuid.v4(),
                    name: self.newFolderName,
                    color: '#000000',
                    children:[]
                };

                newNode.defaultCss = self.currentNode.defaultCss;
                self.currentNode.children.push(newNode);

                //and we open the node parent
                self.expandedNodes.push(self.currentNode);

                // if the new folder is the first one
                if (!self.selectedNode) {
                    self.selectedNode = newNode;
                }
            }
            //And we save the modifications
            self.TemplateTreeService.saveTemplate(self.currentTemplate,self.currentTemplate.name);
            hide();
        };

        /**
         * save the folder from popover
          * @param hide
         */
        self.saveFolder = function(hide) {
            if (self.newNameFolder && self.newNameFolder.length > 0) {
                self.currentNode.name = self.newNameFolder;
                self.currentNode.color = self.newColor;
                self.currentNode.defaultCss = self.newDefaultCss;

                //And we save the modifications
                self.TemplateTreeService.saveTemplate(self.currentTemplate,self.currentTemplate.name);
                hide();
            }
        };

        /**
         * delete node from  the template tree
         * @param node
         */
        self.deleteNode = function(node) {

            // delete the selectednode if it is the current node
            if (angular.equals(node,self.selectedNode)) {
                delete self.selectedNode;
            }

            // In all case we have to delete it from the tree
            self.TreeUtilService
                .deleteNode(node,self.currentTemplate)
                .then(function() {
                    //And we save the modifications
                    self.TemplateTreeService.saveTemplate(self.currentTemplate,self.currentTemplate.name);

                    //we have to clean the expandedNodes
                    var arrayOfNode = self.TreeUtilService.flatFolders(self.currentTemplate);
                    self.expandedNodes = _.intersectionWith(self.expandedNodes,arrayOfNode,function(object,other) {
                        return object.id === other.id;
                    });
                })
                .catch(function(err) {
                    console.error(err);
                });


        };

        /**
         * expande a node
         * @param node
         */
        self.expand = function(node) {
            if (self.expandedNodes.indexOf(node) < 0) {
                self.expandedNodes.push(node);
            }
        };


        /* ***************************** */
        /**
         * handle the drop
         * @param item
         * @param bin
         */
        self.handleDrop = function(item, bin) {

            var nodeDrag = self.TreeUtilService.getNode(item,self.currentTemplate);
            var nodeDrop = null;

            if (bin.startsWith('before')) {
                nodeDrop = self.TreeUtilService.getNode(bin.replace('before',''),self.currentTemplate);
                self.TreeUtilService.moveBefore(nodeDrag,nodeDrop,self.currentTemplate);
            } else {
                if (bin.startsWith('after')) {
                    nodeDrop = self.TreeUtilService.getNode(bin.replace('after',''),self.currentTemplate);
                    self.TreeUtilService.moveAfter(nodeDrag,nodeDrop,self.currentTemplate);
                } else {
                    nodeDrop = self.TreeUtilService.getNode(bin,self.currentTemplate);
                    self.TreeUtilService.moveIn(nodeDrag,nodeDrop,self.currentTemplate);
                    self.expand(nodeDrop);
                }
            }
        };

        /**
         * return true if a node is the first child the current template
         * @param node
         */
        self.isFirstChild = function(node) {
            return self.TreeUtilService.isFirstChild(node,self.currentTemplate);
        };

        /**
         * return true if the node is expanded
         * @param node
         * @returns {*|boolean}
         */
        self.isExpanded = function(node) {
            return self.expandedNodes && self.expandedNodes.indexOf(node) >= 0;
        };

        /**
         * return true if a node isn't expanded and have children
         * @param node
         * @returns {boolean}
         */
        self.showAfter = function(node) {
            return !(self.isExpanded(node) && node.children.length > 0);
        };

        /**
         * change the text in the messages zone
         * @param message
         */
        self.changeButtonText = function(message) {
            self.MessageService.changeMessage(message);
        };



        self.settingsValide();



        /************onBoarding Style******/
        self.onBoardingStepsStyle = self.OnBoardingService.getSteps('Style').steps;

        self.onboardingEnabledStyle = self.OnBoardingService.startFirstTour('Style');

        /**
         * finish the tour for the css
         */
        self.finishTourStyle = function() {
            self.OnBoardingService.finishTour('Style');
            self.onboardingEnabledStyle = false;
        };

        /**
         * start the tour for the css
         */
        self.startTourStyle = function() {
            self.onboardingIndexStyle = 0;
            self.onboardingEnabledStyle = true;
        };

        /************onBoarding Template******/
        self.onBoardingStepsTemplate = self.OnBoardingService.getSteps('Template').steps;

        self.onboardingEnabledTemplate = self.OnBoardingService.startFirstTour('Template');

        /**
         * finish the tour for the template
         */
        self.finishTourTemplate = function() {
            self.OnBoardingService.finishTour('Template');
            self.onboardingEnabledTemplate = false;
        };

        /**
         * start the tour for the template
         */
        self.startTourTemplate = function() {
            self.onboardingIndexTemplate = 0;
            self.onboardingEnabledTemplate = true;
        };

        /**
         * import help files
         */
        self.importHelpFiles = () => {
            self.PrincipalTreeService.addHelpFiles()
                .then(() => {
                    self.checkmark = true;
                })
                .catch((err) => {
                    console.error(err);
                })
        };

    }

}());