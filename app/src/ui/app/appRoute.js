(function () {
    "use strict";

    angular
        .module('Natao')
        .config(AppRoute);


    function AppRoute($routeProvider) {
        $routeProvider.
        when('/firstTimeSettings', {
            templateUrl: 'src/partials/firstTimeSettings.html'
        }).
        when('/settings', {
            templateUrl: 'src/partials/settings.html'
        }).
        when('/editor', {
            templateUrl: 'src/partials/editor.html'
        }).
        when('/loading', {
            templateUrl: 'src/partials/loading.html'
        }).
        otherwise({
            redirectTo: '/loading'
        });

    }

}());