(function () {
    "use strict";

    angular
        .module('Natao')
        .service('CodeMirrorSearchService', CodeMirrorSearchService)
        .run(run);

    //Start of the service
    function run() {
    }

    function SearchState() {
        this.posFrom = this.posTo = this.lastQuery = this.query = null;
        this.overlay = null;
    }



    function CodeMirrorSearchService() {

        var self = this;


        self.init = function(editor) {
            self.editor = editor;
        };

        /**
         * get current search state in the editor or set a new one
         * @param editor
         * @returns {*|SearchState|string|Symbol}
         */
        self.getSearchState = function() {
            return self.editor.state.search || (self.editor.state.search = new SearchState());
        };

        /**
         * return an overlay for highlight in CodeMirror
         * @param query
         * @returns {{token: token}}
         */
        self.searchOverlay = function(query) {
            if (typeof query == "string")
                query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), self.queryCaseInsensitive(query) ? "gi" : "g");
            else if (!query.global)
                query = new RegExp(query.source, query.ignoreCase ? "gi" : "g");

            return {token: function(stream) {
                query.lastIndex = stream.pos;
                var match = query.exec(stream.string);
                if (match && match.index == stream.pos) {
                    stream.pos += match[0].length || 1;
                    return "searching";
                } else if (match) {
                    stream.pos = match.index;
                } else {
                    stream.skipToEnd();
                }
            }};
        };

        /**
         * if all the query string is lower case, it's caseInsensitive
         * @param query
         * @returns {boolean}
         */
        self.queryCaseInsensitive = function(query) {
            return typeof query == "string" && query == query.toLowerCase();
        };

        /**
         * return a search cursor from the editor
         * @param editor
         * @param query
         * @param pos
         * @returns {*}
         */
        self.getSearchCursor = function(query, pos) {
            return self.editor.getSearchCursor(query, pos, self.queryCaseInsensitive(query));
        };


        /**
         *
         * @param query
         */
        self.startSearch = function(query) {
            var state = self.getSearchState();

            state.queryText = query;
            state.query = self.parseQuery(query);
            self.editor.removeOverlay(state.overlay, self.queryCaseInsensitive(state.query));
            state.overlay = self.searchOverlay(state.query, self.queryCaseInsensitive(state.query));
            self.editor.addOverlay(state.overlay);
        };

        self.parseString = function(string) {
            return string.replace(/\\(.)/g, function(_, ch) {
                if (ch == "n") return "\n"
                if (ch == "r") return "\r"
                return ch
            })
        };

        self.parseQuery = function(query) {
            var isRE = query.match(/^\/(.*)\/([a-z]*)$/);
            if (isRE) {
                try { query = new RegExp(isRE[1], isRE[2].indexOf("i") == -1 ? "" : "i"); }
                catch(e) {} // Not a regular expression after all, do a string search
            } else {
                query = self.parseString(query)
            }
            if (typeof query == "string" ? query == "" : query.test(""))
                query = /x^/;
            return query;
        };


        return self;


    }

}());