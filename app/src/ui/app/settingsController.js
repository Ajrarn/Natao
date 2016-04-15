(function () {
    "use strict";

    var beautify_html = require('js-beautify').html;
    var fs = require('fs');

    angular
        .module('Natao')
        .controller('SettingsController', SettingsController);


    function SettingsController($rootScope,$scope,PreferencesService,DatabaseService,$location,$sce,fileDialog,CssService,DocumentsService,TemplateTreeService,$showdown,focus,$timeout) {

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
        self.viewer = true;

        /*if (self.CssService && self.CssService.availableCss && self.CssService.availableCss.length> 0) {
                self.currentCss = self.CssService.availableCss[0];
        }*/

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



        self.documentsPromise = self.DocumentsService.getDocuments();
        self.documentsPromise.then(function(docs) {
            self.documents = docs;
            /*if (self.documents && self.documents.length > 0){
                self.currentDoc = self.documents[0];
                self.changeDocument();
            }*/
        });
        
        self.setCssEditor = function(editor) {
            self.cssEditor = editor;
            Inlet(editor);
        };


        self.settingsValide = function() {
            self.valid = self.PreferencesService.isValid();
        };

       

        self.save = function() {
            self.PreferencesService.save();
            $location.path( '/editor' );
        };

        self.newDatabase = function() {
            self.fileDialog.saveAs(function(filename) {
                self.PreferencesService.settings.fileDatabase = filename;
                if (fs.existsSync(filename)) {
                    fs.unlinkSync(filename);
                }
                self.$scope.$apply();
            },'Natao.db',['db']);
        };

        self.chooseDatabase = function() {
            self.fileDialog.openFile(function(filename){
                self.PreferencesService.settings.fileDatabase = filename;
                self.PreferencesService.saveSettings();
                self.PreferencesService.init();
            }, false, ['db']);
        };

        self.saveCss = function(e) {
            if (self.currentCss) {
                self.CssService.initCurrentByContent(self.currentCss.css);
                self.CssService.saveCss(self.currentCss);
            }
        };

        self.changeDocument = function() {
            self.currentHTML = self.$showdown.makeHtml(self.currentDoc.md);
            self.allHtml();
        };

        self.changeCss = function() {
            self.CssService.initCurrentByContent(self.currentCss.css);
            self.focus('cssEditor');
            console.log('selectedPane',self.selectedPane);
        };

        self.initAddCss= function() {
            self.newCssName = null;
            self.focus('addCssName');
        };

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

        self.deleteCss = function(hide) {
            self.CssService.deleteCss(self.currentCss);
            self.currentCss = null;
            self.CssService.initCurrentByContent('');
            hide();
        };

        self.editorReadOnly = function(_editor) {
            // Options
            _editor.setReadOnly(true);
        };

        self.allHtml = function() {

            var completeHtml = '<div flex layout="column" layout-align="start stretch">' +
                '<div class="haut" layout="row" layout-align="start stretch">' +
                '<div class="identity" layout="column" layout-align="center center">' +
                '<p>' + self.PreferencesService.preferences.name +'</p>' +
                '<p>' + self.PreferencesService.preferences.firstName +'</p>' +
                '<p>' + self.PreferencesService.preferences.className + '</p>' +
                '</div>' +
                '<div class="title-zone" flex layout="column" layout-align="center center">' +
                '<h1>' + self.currentDoc.title +'</h1>' +
                '<p id="dateCreated">' + self.currentDoc.created + '</p>' +
                '</div>' +
                '</div>' +
                '<div class="notation"></div>' +
                '<div class="devoir" flex layout="row" layout-align="start stretch">' +
                '<div class="marge"></div>' +
                '<div id="rendu" flex>'+ self.currentHTML +'</div>' +
                '</div></div>';

            self.currentHtmlAll = beautify_html(completeHtml);
        };

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


        self.settingsValide();

    }

}());