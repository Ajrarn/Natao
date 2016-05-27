(function () {
    "use strict";

    var fs = require('fs');

    angular
        .module('Natao')
        .service('OnBoardingService', OnBoardingService)
        .run(run);

    //Start of the service
    function run() {
        console.log('run');
    }



    function OnBoardingService($translate,$q) {
        console.log('OnBoardingService');

        var self = this;
        self.$translate = $translate;

        self.init = function() {

            return $q(function(resolve,reject) {


                // And the we load the tours and steps for onBoarding
                var onBoardingFile = fs.readFileSync('./languages/onBoarding-' + self.$translate.use() + '.json','utf8');

                self.tours = [];

                if (onBoardingFile) {
                    try {
                        var onBoarding = JSON.parse(onBoardingFile);

                        self.tours = onBoarding.tours;

                        self.customOptions = {
                            nextButtonText: onBoarding.texts.nextButtonText,
                            previousButtonText: onBoarding.texts.previousButtonText,
                            doneButtonText: onBoarding.texts.doneButtonText,
                            actualStepText: onBoarding.texts.actualStepText,
                            totalStepText: onBoarding.texts.totalStepText
                        };

                        resolve();
                    }
                    catch (err) {
                        reject(err);
                    }
                }

            });
        };

        
        self.getSteps = function(tourName) {
            return self.tours.find(function(item) {
                return item.tour === tourName;
            });
        };

        return self;


    }

}());