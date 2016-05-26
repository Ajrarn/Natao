
(function () {
    "use strict";

    angular
        .module('Natao')
        .service('OnBoardingService', OnBoardingService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }



    function OnBoardingService($translate) {
        console.log('OnBoardingService');

        var self = this;
        self.$translate = $translate;

        self.customOptions = {
            nextButtonText: 'Suivant &rarr;',
            previousButtonText: '&larr; Précédent',
            doneButtonText: 'Fin',
            actualStepText: 'Etape',
            totalStepText: 'de'
        };
        
        self.getSteps = function(partialName) {
            return [
                {
                    title: "Bienvenue!",
                    position: "centered",
                    description: "Bienvenue dans Natao, nous allons explorer ensemble cet écran",
                    width: 300
                },
                {
                    title: "Barre d'outils",
                    description: "Ici tu trouveras les outils principaux de Natao",
                    attachTo: "#toolbar",
                    position: "bottom"
                }
            ];
        };


        return self;


    }

}());