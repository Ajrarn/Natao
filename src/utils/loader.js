(function () {
    "use strict";

    var template = '<div class="preloader-wrap" layout="column" layout-align="center center">' +
        '<span class="preloader"></span>' +
        '<span class="screen"></span>' +
        '</div>';

    angular
        .module('Natao')
        .directive('loader', function() {
            return {
                restrict: 'A',
                scope: {
                    loader: '='
                },
                link: function($scope, element, attrs) {

                    var loaderElm = angular.element(template);

                    $scope.$watch(
                        function() {
                            return $scope.loader;
                        },
                        function(val) {
                            if (val) {
                                loaderElm.show();
                            } else {
                                loaderElm.hide();
                            }
                    });
                    element.append(loaderElm);
                },
                template: template
            };
        });


}());


