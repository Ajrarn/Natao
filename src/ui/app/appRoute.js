(function () {
    "use strict";

    angular
        .module('Natao')
        .config(AppRoute);


    function AppRoute($routeProvider) {
        console.log('RouteConfig');
        $routeProvider.
        when('/settings', {
            templateUrl: 'src/partials/settings.html'
        }).
        when('/app', {
            templateUrl: 'src/partials/app.html'
        }).
        otherwise({
            redirectTo: '/app'
        });



    }

}());