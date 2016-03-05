(function () {
    "use strict";


    angular
        .module('Natao')
        .controller('LoadingController', LoadingController);


    function LoadingController(PreferencesService,CssService,TemplateTreeService,PrincipalTreeService,$location,$timeout) {


        this.PreferencesService = PreferencesService; //The preferences init send us here
        this.CssService = CssService;
        this.TemplateTreeService = TemplateTreeService;

        this.PrincipalTreeService = PrincipalTreeService;
        this.$location = $location;
        this.$timeout = $timeout;

        var self = this;

        //Test loader
        self.loader = true;
        self.$timeout(function() {
            self.loader = false;
        }, 3000);




        self.db = self.PreferencesService.getDB();

        var cssPromise = self.CssService.getInitCss(self.db);


        //when all the services are ready we go to the editor
        cssPromise.then(function(defaultCss) {
            var templatePromise = self.TemplateTreeService.getInitTemplate(self.db);

            templatePromise.then(function() {
                var principalTreePromise = self.PrincipalTreeService.getInitTreeService(self.db,defaultCss);

                principalTreePromise.then(function() {
                    //$location.path('/editor');
                    self.loader = false;
                })
            });

        });
    }

}());