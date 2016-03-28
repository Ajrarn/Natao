(function () {
    "use strict";

    angular
        .module('Natao')
        .config(AppConfig);


    function AppConfig($translateProvider,tmhDynamicLocaleProvider) {
        console.log('AppConfig');

        $translateProvider.useStaticFilesLoader({
            prefix: './languages/locale-',
            suffix: '.json'
        });

        //$translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.preferredLanguage('fr_FR');

        tmhDynamicLocaleProvider.localeLocationPattern('./bower_components/angular-i18n/angular-locale_{{locale}}.js');

    }

}());