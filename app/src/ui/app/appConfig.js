(function () {
    "use strict";

    angular
        .module('Natao')
        .config(AppConfig);


    function AppConfig($translateProvider) {
        console.log('AppConfig');

        $translateProvider.useStaticFilesLoader({
            prefix: './languages/locale-',
            suffix: '.json'
        }).registerAvailableLanguageKeys(['en_US', 'fr_FR'], {
            'en': 'en_US',
            'fr': 'fr_FR'
        }).determinePreferredLanguage().fallbackLanguage(['en_US']);;

        //$translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useSanitizeValueStrategy('escape');
  
    }

}());