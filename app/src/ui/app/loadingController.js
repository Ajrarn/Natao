(function () {
    "use strict";


    angular
        .module('Natao')
        .controller('LoadingController', LoadingController);


    function LoadingController(PreferencesService,CssService,AppStateService,TemplateTreeService,PrincipalTreeService,TrashTreeService,$location,OnBoardingService,$q,$translate) {

        this.PreferencesService = PreferencesService; //The preferences init send us here
        this.CssService = CssService;
        this.AppStateService = AppStateService;
        this.TemplateTreeService = TemplateTreeService;

        this.PrincipalTreeService = PrincipalTreeService;
        this.TrashTreeService = TrashTreeService;
        this.OnBoardingService = OnBoardingService;
        this.$location = $location;
        this.$translate = $translate;

        var self = this;

        //when all the services are ready we go to the editor

        $translate.onReady()
            .then(function() {
                self.CssService.getInitCss()
                    .then(function(defaultCss) {

                        self.AppStateService.initAppState()
                            .then(() => {
                                var templatePromise = self.TemplateTreeService.getInitTemplate();
                                var principalTreePromise = self.PrincipalTreeService.getInitTreeService(defaultCss);
                                var onBoardingPromise = self.OnBoardingService.init();
                                self.TrashTreeService.initTreeService();

                                $q.all([templatePromise,principalTreePromise,onBoardingPromise])
                                    .then(function() {
                                        $location.path('/editor');
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                    });
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
       
    }

}());