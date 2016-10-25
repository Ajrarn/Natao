(function () {
    "use strict";

    var fs = require('fs');

    angular
        .module('Natao')
        .controller('HelpController', HelpController);


    function HelpController($location,$showdown,tmhDynamicLocale,$rootScope,$timeout, ShowDownUtilService) {

        var self = this;
        self.$location = $location;
        self.$showdown = $showdown;
        self.$showdown.setOption('tables',true);
        self.$showdown.setOption('strikethrough',true);
        self.$showdown.setOption('tasklists',true);
        self.$rootScope = $rootScope;
        self.$timeout = $timeout;
        self.ShowDownUtilService = ShowDownUtilService;

        // language and document from the url
        self.lang = $location.search().language;
        self.theme = $location.search().theme;
        self.showDys = ($location.search().showDys === 'true');

        //Set the language of the help
        tmhDynamicLocale.set(self.lang.toLowerCase().replace('_','-'));


        self.currentHelpMarkdown = fs.readFileSync(process.cwd() + '/languages/helpMarkdown-' + self.lang + '.md','utf8');
        self.currentHelpEditor = fs.readFileSync(process.cwd() + '/languages/helpEditor-' + self.lang + '.md','utf8');
        self.currentHelpAsciiMath = fs.readFileSync(process.cwd() + '/languages/helpAsciiMath-' + self.lang + '.md','utf8');
        self.currentHelpSettings = fs.readFileSync(process.cwd() + '/languages/helpSettings-' + self.lang + '.md','utf8');
        self.currentHelpBehind = fs.readFileSync(process.cwd() + '/languages/helpBehindTheScenes-' + self.lang + '.md','utf8');
        self.currentHelpCss = fs.readFileSync(process.cwd() + '/languages/helpCss-' + self.lang + '.md','utf8');

        
        // watch the last help file  to avoid open in Natao the <a href>
        self.$rootScope.$watch(function(){
            return self.currentHelpSettings ;
        },function() {
            self.ShowDownUtilService.showDownHooks();
        });
        
    }

}());