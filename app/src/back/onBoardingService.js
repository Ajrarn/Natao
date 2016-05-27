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

                self.customOptions = {};

                //first we init the options that will be used for Natao
                var promiseNext = $translate('TOUR_NEXT');
                var promisePrevious = $translate('TOUR_PREVIOUS');
                var promiseDone = $translate('TOUR_DONE');
                var promiseStep = $translate('TOUR_STEP');
                var promiseOf = $translate('TOUR_OF');

                $q.all(promiseNext,promisePrevious,promiseDone,promiseStep,promiseOf)
                    .then(function(next,previous,done,step,of) {

                        self.customOptions = {
                            nextButtonText: next,
                            previousButtonText: previous,
                            doneButtonText: done,
                            actualStepText: step,
                            totalStepText: of
                        };

                        // And the we load the tours and steps for onBoarding
                        var onBoardingFile = fs.readFileSync('./languages/onBoarding-' + self.$translate.use() + '.json','utf8');

                        self.tours = [];

                        if (onBoardingFile) {
                            try {
                                self.tours = JSON.parse(onBoardingFile);
                                resolve();
                            }
                            catch (err) {
                                reject(err);
                            }
                        }



                    }).catch(function(err){
                        reject(err);
                    });
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