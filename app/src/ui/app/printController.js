(function () {
    "use strict";

    var fs = require('fs');

    angular
        .module('Natao')
        .controller('PrintController', PrintController);


    function PrintController($location,$showdown,$translate,tmhDynamicLocale,$rootScope,$timeout,DocumentsService, CssService, DatabaseService ) {

        var self = this;
        self.$location = $location;
        self.$showdown = $showdown;
        self.$showdown.setOption('tables',true);
        self.$showdown.setOption('strikethrough',true);
        self.$showdown.setOption('tasklists',true);
        self.$rootScope = $rootScope;
        self.$timeout = $timeout;
        self.DocumentsService = DocumentsService;
        self.CssService = CssService;
        self.DatabaseService = DatabaseService;

        // language and document from the url
        self.lang = $location.search().language;
        self.docId = $location.search().docId;
        self.showDys = ($location.search().showDys === 'true');

        //Set the language of the help
        var locale = self.lang.replace('_','-').toLowerCase();
        if (locale === 'fr') {
            locale = 'fr-fr';
        }
        tmhDynamicLocale.set(locale);


        //set the db
        self.DatabaseService.setDB(localStorage.getItem('nataoFileDatabase'));

        self.DatabaseService
            .find({docName:'Preferences'})
            .then(function(docs) {
                self.preferences = docs[0];
            })
            .catch(function() {
                console.error('Document not found');
            });

        $translate.onReady()
            .then(function() {
                // Don't know why but language is not set here so we force it
                $translate.use(self.lang).then(function() {
                    self.CssService.getInitCss()
                        .then(function(defaultCss) {
                            //Init of the current Markdown
                            if (self.docId) {
                                self.DocumentsService
                                    .findDocument(self.docId)
                                    .then(function(docs) {
                                        self.currentMarkdown = docs[0];
                                        console.log(self.currentMarkdown.css);
                                        self.CssService.initCurrentById(self.currentMarkdown.css);

                                        self.$timeout(function() {
                                            $('a').on('click', function(){
                                                require('nw.gui').Shell.openExternal( this.href );
                                                return false;
                                            });

                                            // Specify language or nohighlight in th first line inside :: like this ::nohighlight::
                                            $('pre code').each(function(i, block) {
                                                if (block.textContent.startsWith('::')) {
                                                    var classe = block.textContent.split('\n')[0].replace('::','');
                                                    block.textContent = block.textContent.replace('::' + classe + '\n', '');
                                                    block.classList.add(classe);
                                                } else {
                                                    // by default we add th class nohighlight
                                                    block.classList.add('nohighlight');
                                                }
                                                hljs.highlightBlock(block);
                                            });
                                        },0,false);
                                        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                                        MathJax.Hub.Queue(self.print);
                                    }).catch(function(err) {
                                    console.error(err);
                                });
                            }
                        })
                        .catch(function(err) {
                            console.error(err);
                        });
                });



            });



        self.print = function() {
            //setTimeout(function() {
                window.print();
                window.close();
            //}, 1500);

        };



    }

}());