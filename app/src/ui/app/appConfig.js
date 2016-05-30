(function () {
    "use strict";

    angular
        .module('Natao')
        .config(AppConfig);


    function AppConfig($translateProvider,tmhDynamicLocaleProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: './languages/locale-',
            suffix: '.json'
        }).registerAvailableLanguageKeys(['en', 'fr'], {
            'en_US': 'en',
            'en_GB': 'en',
            'fr_FR': 'fr'
        }).determinePreferredLanguage().fallbackLanguage(['en']);

        //$translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useSanitizeValueStrategy('escape');

        tmhDynamicLocaleProvider.localeLocationPattern('./bower_components/angular-i18n/angular-locale_{{locale}}.js');
        
    }

}());