(function () {
    "use strict";

    angular
        .module('Natao')
        .config(AppConfig);


    function AppConfig($showdownProvider) {
        console.log('AppConfig');

        $showdownProvider.loadExtension(mathjax);



        MathJax.Hub.Config({
            asciimath2jax: {
                delimiters: [['$m$','$m$']]
            }
        });


    }

    var mathjax = function(converter) {

        var escapeCharacters = function(text, charsToEscape, afterBackslash) {
            // First we have to escape the escape characters so that
            // we can build a character class out of them
            var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g,"\\$1") + "])";

            if (afterBackslash) {
                regexString = "\\\\" + regexString;
            }

            var regex = new RegExp(regexString,"g");
            text = text.replace(regex,escapeCharacters_callback);

            return text;
        }


        var escapeCharacters_callback = function(wholeMatch,m1) {
            var charCodeToEscape = m1.charCodeAt(0);
            return "~E"+charCodeToEscape+"E";
        }

        return [
            {
                type    : 'lang',
                regex   : '(?:~D~D~D)(.*)(?:~D~D~D)',
                replace : function(match, content) {
                    content = content.replace(/\*/g,"\\cdot")
                    return '<div>$m$' + escapeCharacters(content,"\*_{}[]\\",false) + '$m$</div>';
                }
            },
            {
                type    : 'lang',
                regex   : '(?:~D~D)(.*)(?:~D~D)',
                replace : function(match, content) {
                    content = content.replace(/\*/g,"\\cdot")
                    return '$m$' + escapeCharacters(content,"\*_{}[]\\",false) + '$m$';
                }
            }
        ];
    };

}());