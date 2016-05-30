(function () {
    "use strict";


    angular
        .module('Natao')
        .controller('LoadingController', LoadingController);


    function LoadingController(PreferencesService,CssService,TemplateTreeService,PrincipalTreeService,$location,OnBoardingService,$q,$translate) {


        this.PreferencesService = PreferencesService; //The preferences init send us here
        this.CssService = CssService;
        this.TemplateTreeService = TemplateTreeService;

        this.PrincipalTreeService = PrincipalTreeService;
        this.OnBoardingService = OnBoardingService
        this.$location = $location;
        this.$translate = $translate;

        var self = this;

        //when all the services are ready we go to the editor

        $translate.onReady()
            .then(function() {
                self.CssService.getInitCss().then(function(defaultCss) {
                    var templatePromise = self.TemplateTreeService.getInitTemplate();
                    var principalTreePromise = self.PrincipalTreeService.getInitTreeService(defaultCss);
                    var onBoardingPromise = OnBoardingService.init();

                    $q.all([templatePromise,principalTreePromise,onBoardingPromise])
                        .then(function() {
                            $location.path('/editor');
                        });

                });
            });
       
    }

}());