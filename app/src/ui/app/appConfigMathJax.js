(function () {
    "use strict";

    angular
        .module('Natao')
        .config(AppConfigMathJax);


    function AppConfigMathJax() {
        console.log('AppConfigMathJax');


        MathJax.Hub.Config({
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