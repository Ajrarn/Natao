(function () {
    "use strict";

    var uuid = require('node-uuid');

    angular
        .module('Natao')
        .controller('EditorController', EditorController);


    function EditorController($showdown,$timeout,PreferencesService,PrincipalTreeService) {
        console.log('EditorController');

        var self = this;
        self.$showdown = $showdown;
        self.$timeout = $timeout;
        self.PreferencesService = PreferencesService;
        self.PrincipalTreeService = PrincipalTreeService;
        self.PrincipalTreeService.init();
        self.$showdown.setOption('tables',true);
        self.inPrint = false;

        self.myMath = 'x+\\sqrt{1-x^2}';

        self.myMarkdown = '$$sqrt(2)/2$$ \n'
            +'$$'+self.myMath+'$$';


        self.refresh = function() {
            self.PrincipalTreeService.saveCurrent();
            //self.myHtml =  self.$showdown.makeHtml(self.myMarkdown);
            setTimeout(self.refreshMath, 100);  //without angular $digest
        };

        self.refreshMath = function() {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        };


        self.offPrint = function() {
            self.inPrint = false;
        };










        /**************************************/

        self.print = function() {
            self.inPrint = true;
            setTimeout(window.print, 1050);       //without angular $digest
            self.$timeout(self.offPrint, 1150);  //with angular $digest
        };
    }

}());