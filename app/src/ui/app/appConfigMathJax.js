(function () {
    "use strict";

    angular
        .module('Natao')
        .config(AppConfigMathJax);


    function AppConfigMathJax() {

        MathJax.Hub.Config({
            messageStyle: 'none',
            asciimath2jax: {
                delimiters: [['@@','@@']],
                ignoreClass: ['customEditor']
            },
            tex2jax: {
                inlineMath: [ ['$$','$$'] ],
                displayMath: [ ['$$$','$$$'] ]
            }
        });


    }

}());