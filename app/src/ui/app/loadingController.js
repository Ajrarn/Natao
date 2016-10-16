(function () {
    "use strict";


    angular
        .module('Natao')
        .controller('LoadingController', LoadingController);


    function LoadingController(PreferencesService,CssService,TemplateTreeService,PrincipalTreeService,TrashTreeService,$location,OnBoardingService,$q,$translate) {

        console.log('loadingController');


        this.PreferencesService = PreferencesService; //The preferences init send us here
        this.CssService = CssService;
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
                self.CssService.getInitCss().then(function(defaultCss) {
                    var templatePromise = self.TemplateTreeService.getInitTemplate();
                    var principalTreePromise = self.PrincipalTreeService.getInitTreeService(defaultCss);
                    var onBoardingPromise = self.OnBoardingService.init();
                    var trashTreePromise = self.TrashTreeService.getInitTreeService();

                    $q.all([templatePromise,principalTreePromise,trashTreePromise,onBoardingPromise])
                        .then(function() {
                            $location.path('/editor');
                        });

                });
            });
       
    }

}());