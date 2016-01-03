(function () {
    "use strict";

    var uuid = require('node-uuid');

    angular
        .module('Natao')
        .controller('EditorController', EditorController);


    function EditorController($showdown,$rootScope,$timeout,DatabaseService,PreferencesService,PrincipalTreeService) {
        console.log('EditorController');

        var self = this;
        self.$showdown = $showdown;
        self.$timeout = $timeout;
        self.DatabaseService = DatabaseService;
        self.PreferencesService = PreferencesService;
        self.PrincipalTreeService = PrincipalTreeService;
        self.PrincipalTreeService.init();
        self.$showdown.setOption('tables',true);
        self.inPrint = false;

        self.myMath = 'x+\\sqrt{1-x^2}';

        self.myMarkdown = '$$sqrt(2)/2$$ \n'
            +'$$'+self.myMath+'$$';


        self.refresh = function() {
            self.myHtml =  self.$showdown.makeHtml(self.myMarkdown);
            setTimeout(self.refreshMath, 100);  //without angular $digest
        };

        self.refreshMath = function() {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        };


        self.offPrint = function() {
            self.inPrint = false;
        };




        /*************Tree **********/


        self.dataForTheTree = [
            {
                id:'1',
                name:'CM2',
                children: [
                    {
                        id:'11',
                        name: 'Mathématiques',
                        children: [
                            {id:'111', name:'Géomètrie'},
                            {id:'112', name:'Algèbre'},
                            {id:'113', name:'Trigonométrie'}
                        ]
                    },
                    {
                        id:'12',
                        name:'Français',
                        children:[
                            {id:'121', name:'Orthographe'},
                            {id:'122', name:'Grammaire'},
                            {id:'123', name:'Conjugaisons'}
                        ]
                    },
                    {
                        id:'13',
                        name:'Histoire',
                        children:[]
                    }
                ]
            },
            {
                id:'2',
                name:'6ème',
                children: [
                    {id:'21',name:'Mathématiques'},
                    {id:'22',name:'Français'},
                    {id:'23',name:'Histoire'}
                ]
            },
            {
                id:'3',
                name:'5ème',
                children: [
                    {id:'31',name:'Mathématiques'},
                    {id:'32',name:'Français'},
                    {id:'33',name:'Histoire'}
                ]
            }

        ];



        /**************************************/

        self.print = function() {
            self.inPrint = true;
            setTimeout(window.print, 1050);       //without angular $digest
            self.$timeout(self.offPrint, 1150);  //with angular $digest
        };
    }

}());