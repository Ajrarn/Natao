(function () {
    "use strict";

    angular
        .module('Natao')
        .service('MessageService',function($translate) {
            var self = this;
            self.$translate = $translate;

            self.messageActive = false;

            self.changeMessage = function(message) {
                if (message && message.length > 0) {
                    self.messageActive = true;
                    self.$translate(message).then(function (translation) {
                        self.message = translation;
                    });
                } else {
                    self.messageActive = false;
                }

            };
            return self;
        })
        .directive('message', function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                template:'<div class="buttonText" ng-class="{active:MessageService.messageActive}">{{MessageService.message}}</div>',
                controller: function($scope,MessageService) {
                    $scope.MessageService = MessageService;
                },
                replace: false
            };
        })


}());