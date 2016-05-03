(function () {
    "use strict";


    angular
        .module('Natao')
        .directive('combineScroll', [function(){

            var scrollTop = 0;
            function combine(elements){
                elements.on('scroll', function(e){
                    if(e.isTrigger){
                        debugger;
                        e.target.scrollTop = scrollTop;
                    }else {
                        scrollTop = e.target.scrollTop;
                        elements.each(function (element) {
                            if( !this.isSameNode(e.target) ){
                                $(this).trigger('scroll');
                            }
                        });
                    }
                });
            }

            return {
                restrict: 'A',
                replace: false,
                compile: function(element, attrs){
                    var elements = element.find('.' + attrs.combineScroll);
                    
                    combine(elements);
                }
            };
        }]);

}());
