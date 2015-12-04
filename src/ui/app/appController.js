(function () {
    "use strict";

    angular
        .module('Natao')
        .controller('AppController', AppController);


    function AppController($showdown,$rootScope,$timeout) {
        console.log('AppController');

        var self = this;
        self.$showdown = $showdown;
        self.$timeout = $timeout;
        self.zoomLevel = 0;
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

        self.zoomHigher = function() {
            self.zoomLevel++;
            self.zoomChange();
        };

        self.zoomLower = function() {
            self.zoomLevel--;
            self.zoomChange();
        };

        self.offPrint = function() {
            self.inPrint = false;
        };



        self.print = function() {
            self.inPrint = true;
            setTimeout(window.print, 50);       //without angular $digest
            self.$timeout(self.offPrint, 100);  //with angular $digest
        };

        self.zoomChange = function() {

            if ($rootScope.nodeWebkitVersion !== 'browser') {
                var gui = require('nw.gui');
                var win = gui.Window.get();
                win.zoomLevel = self.zoomLevel;
            }


        }

    }

}());