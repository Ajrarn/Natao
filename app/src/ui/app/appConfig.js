(function () {
    "use strict";

    angular
        .module('Natao')
        .config(AppConfig);


    function AppConfig($translateProvider,tmhDynamicLocaleProvider, $locationProvider, $showdownProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        $showdownProvider.loadExtension(toc);
        //$showdownProvider.loadExtension(toc);

        $translateProvider.useStaticFilesLoader({
            prefix: './languages/locale-',
            suffix: '.json'
        }).registerAvailableLanguageKeys(['en', 'fr'], {
            'en*': 'en',
            'fr*': 'fr'
        }).determinePreferredLanguage(function() {
            if (!window.navigator.languages[0].startsWith(window.navigator.language)) {
                return window.navigator.language;
            } else {
                return window.navigator.languages[0];
            }
            }).fallbackLanguage(['en']);


        //$translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useSanitizeValueStrategy('escape');

        tmhDynamicLocaleProvider.localeLocationPattern('./bower_components/angular-i18n/angular-locale_{{locale}}.js');
        
    }


    var toc = function(converter) {
        return [

            {
                type: 'output',
                filter: function(source) {

                    var tocHtml;

                    if (source.indexOf('[toc]') > 0) {
                        var elements = $('<div></div>');
                        elements.html(source);
                        var titles = $('h1,h2,h3,h4,h5,h6', elements);

                        console.log('find', elements.find('p:contains("[toc]")'));

                        console.log('titles', titles);

                        tocHtml = '<ol class="showdown-toc">';


                        var previousLevel = 0;
                        var currentLevel = 0;

                        titles.each((index, item) => {
                            currentLevel = parseInt(item.nodeName.replace('H', ''));

                            if (previousLevel === 0) {
                                tocHtml = tocHtml + '<li><a href="#'+ item.id +'" target="_self">'+ item.textContent +'</a></li>';
                            } else {
                                if (currentLevel === previousLevel) {
                                    console.log('=');
                                    tocHtml = tocHtml + '<li><a href="#'+ item.id +'" target="_self">'+ item.textContent +'</a></li>';
                                } else {
                                    if (currentLevel >= previousLevel) {
                                        console.log('>');
                                        tocHtml = tocHtml + '<ol>';
                                        tocHtml = tocHtml + '<li><a href="#'+ item.id +'" target="_self">'+ item.textContent +'</a></li>';

                                    } else {
                                        console.log('<');
                                        let nbDif = previousLevel - currentLevel;
                                        console.log('nbDif', nbDif);
                                        switch (previousLevel - currentLevel) {
                                            case 2: tocHtml = tocHtml + '</ol></ol>';
                                                break;
                                            case 3: tocHtml = tocHtml + '</ol></ol></ol>';
                                                break;
                                            case 4: tocHtml = tocHtml + '</ol></ol></ol></ol>';
                                                break;
                                            case 5: tocHtml = tocHtml + '</ol></ol></ol></ol></ol>';
                                                break;
                                            default: tocHtml = tocHtml + '</ol>';
                                                break;
                                        }
                                        tocHtml = tocHtml + '<li><a href="#'+ item.id +'" target="_self">'+ item.textContent +'</a></li>';
                                    }
                                }

                            }
                            previousLevel = currentLevel;
                        });

                        // at the end we close all the ol
                        switch (currentLevel) {
                            case 2: tocHtml = tocHtml + '</ol></ol>';
                                break;
                            case 3: tocHtml = tocHtml + '</ol></ol></ol>';
                                break;
                            case 4: tocHtml = tocHtml + '</ol></ol></ol></ol>';
                                break;
                            case 5: tocHtml = tocHtml + '</ol></ol></ol></ol></ol>';
                                break;
                            default: tocHtml = tocHtml + '</ol>';
                                break;
                        }


                    }

                    /*let tocDom = $('<div></div>');
                    tocDom.html(tocHtml);*/

                    source = source.replace('<p>[toc]</p>', tocHtml);
                    //elements.replaceWith('p:contains("[toc]")', tocDom);

                    return source;
                    //return elements.html();
                }
            }

        ];
    };

}());