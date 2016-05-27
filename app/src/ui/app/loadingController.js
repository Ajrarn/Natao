(function () {
    "use strict";


    angular
        .module('Natao')
        .controller('LoadingController', LoadingController);


    function LoadingController(PreferencesService,CssService,TemplateTreeService,PrincipalTreeService,$location,OnBoardingService) {


        this.PreferencesService = PreferencesService; //The preferences init send us here
        this.CssService = CssService;
        this.TemplateTreeService = TemplateTreeService;

        this.PrincipalTreeService = PrincipalTreeService;
        this.OnBoardingService = OnBoardingService
        this.$location = $location;

        var self = this;

        //self.db = self.PreferencesService.getDB();

        var cssPromise = self.CssService.getInitCss();


        //when all the services are ready we go to the editor
        cssPromise.then(function(defaultCss) {
            var templatePromise = self.TemplateTreeService.getInitTemplate();

            templatePromise.then(function() {
                var principalTreePromise = self.PrincipalTreeService.getInitTreeService(defaultCss);

                principalTreePromise.then(function() {
                    OnBoardingService
                        .init()
                        .then(function() {
                            $location.path('/editor');
                        });
                    
                })
            });

        });
    }

}());