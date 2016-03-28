(function () {
    "use strict";


    angular
        .module('Natao')
        .controller('LoadingController', LoadingController);


    function LoadingController(PreferencesService,CssService,TemplateTreeService,PrincipalTreeService,$location) {


        this.PreferencesService = PreferencesService; //The preferences init send us here
        this.CssService = CssService;
        this.TemplateTreeService = TemplateTreeService;

        this.PrincipalTreeService = PrincipalTreeService;
        this.$location = $location;

        var self = this;

        self.db = self.PreferencesService.getDB();

        var cssPromise = self.CssService.getInitCss(self.db);


        //when all the services are ready we go to the editor
        cssPromise.then(function(defaultCss) {
            var templatePromise = self.TemplateTreeService.getInitTemplate(self.db);

            templatePromise.then(function() {
                var principalTreePromise = self.PrincipalTreeService.getInitTreeService(self.db,defaultCss);

                principalTreePromise.then(function() {
                    $location.path('/editor');
                })
            });

        });
    }

}());