(function () {
    "use strict";

    var fs = require('fs');

    angular
        .module('Natao')
        .controller('HelpController', HelpController);


    function HelpController($location,$showdown) {
        console.log('HelpController');

        var self = this;
        self.$location = $location;
        self.$showdown = $showdown;
        self.$showdown.setOption('tables',true);
        self.$showdown.setOption('strikethrough',true);
        self.$showdown.setOption('tasklists',true);


        self.urlArray = $location.absUrl().split('?');
        self.lang = self.urlArray[1].split('=')[1].split(',')[0];
        self.theme = self.urlArray[1].split('=')[2];

        console.log(self.param);


        self.currentHelpMarkdown = fs.readFileSync(process.cwd() + '/translations/helpMarkdown-' + self.lang + '.md','utf8');
        self.currentHelpEditor = fs.readFileSync(process.cwd() + '/translations/helpEditor-' + self.lang + '.md','utf8');
        self.currentHelpAsciiMath = fs.readFileSync(process.cwd() + '/translations/helpAsciiMath-' + self.lang + '.md','utf8');
    }

}());