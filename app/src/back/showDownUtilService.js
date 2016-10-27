(function () {
    "use strict";

    angular
        .module('Natao')
        .service('ShowDownUtilService', ShowDownUtilService)
        .run(run);

    //Start of the service
    function run() {
    }

    function ShowDownUtilService($timeout, $anchorScroll, $location) {

        var self = this;
        self.$timeout = $timeout;
        self.$anchorScroll = $anchorScroll;
        self.$location = $location;


        /**
         * hook for a href and highlight
         */
        self.showDownHooks = function () {
            self.$timeout(function() {
                // external links open in a browser
                $('.viewer a').not('[href^="#"]').on('click', function(){
                    require('nw.gui').Shell.openExternal( this.href );
                    return false;
                });

                // internal links generated bu showdown navigate with scrollTo
                $('.viewer a[href^="#"]').on('click', function(eent){
                    console.log('click', event.currentTarget.hash);
                    self.scrollTo(event.currentTarget.hash.replace('#',''));
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
        };

        self.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };

        return self;

    }

}());