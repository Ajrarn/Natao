(function () {
    "use strict";

    angular
        .module('Natao')
        .service('CodeMirrorUtilService', CodeMirrorUtilService)
        .run(run);

    //Start of the service
    function run() {
    }

    function SearchState() {
        this.posFrom = this.posTo = this.lastQuery = this.query = null;
        this.overlay = null;
    }



    function CodeMirrorUtilService($timeout) {

        var self = this;
        self.$timeout = $timeout;


        self.init = function(editor) {
            self.editor = editor;
        };

        /*************************** Search features *******************************************/


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
         * start the search by setting an overlay on words found
         * @param query
         */
        self.startSearch = function(query) {
            var state = self.getSearchState();

            state.queryText = query;
            state.query = self.parseString(query);
            self.editor.removeOverlay(state.overlay, self.queryCaseInsensitive(state.query));
            state.overlay = self.searchOverlay(state.query, self.queryCaseInsensitive(state.query));
            self.editor.addOverlay(state.overlay);
        };


        /**
         * read the string
         * @param string
         * @returns {*|void|XML}
         */
        self.parseString = function(string) {
            return string.replace(/\\(.)/g, function(_, ch) {
                if (ch == "n") return "\n";
                if (ch == "r") return "\r";
                return ch;
            })
        };

        /**
         * go to the next word
         * @param reverse
         * @param callback
         */
        self.findNext = function(reverse, callback) {
            self.editor.operation(function() {
                var state = self.getSearchState();
                var cursor = self.getSearchCursor(state.query, reverse ? state.posFrom : state.posTo);
                if (!cursor.find(reverse)) {
                    cursor = self.getSearchCursor(state.query, reverse ? CodeMirror.Pos(self.editor.lastLine()) : CodeMirror.Pos(self.editor.firstLine(), 0));
                    if (!cursor.find(reverse)) return;
                }
                self.editor.setSelection(cursor.from(), cursor.to());
                self.editor.scrollIntoView({from: cursor.from(), to: cursor.to()}, 20);
                state.posFrom = cursor.from(); state.posTo = cursor.to();
                state.cursor = cursor;
                if (callback) callback(cursor.from(), cursor.to())
            });
        };


        /**
         * replace all items found by text
         * @param text
         */
        self.replaceAll = function(text) {
            var state = self.getSearchState();
            self.editor.operation(function() {
                for (var cursor = self.getSearchCursor(state.query); cursor.findNext();) {
                    cursor.replace(text);
                }
            });
        };

        /**
         * replace current found item with text
         * @param text
         */
        self.replace = function(text) {

            var state = self.getSearchState();
            state.cursor.replace(text);
            self.findNext();
        };


        /**
         * clear the search effects on codeMirror
         */
        self.clearSearch = function() {
            self.editor.operation(function() {
                var state = self.getSearchState();
                state.lastQuery = state.query;
                if (!state.query) return;
                state.query = state.queryText = null;
                self.editor.removeOverlay(state.overlay);
                if (state.annotate) { state.annotate.clear(); state.annotate = null; }
            });
        };



        /** Function that count occurrences of a substring in a string;
         * @param {String} string               The string
         * @param {String} subString            The sub string to search for
         * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
         * @author Vitim.us http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
         */
        self.occurrences = function(string, subString, allowOverlapping) {

            string += "";
            subString += "";
            if (subString.length <= 0) return (string.length + 1);

            var n = 0,
                pos = 0,
                step = allowOverlapping ? 1 : subString.length;

            while (true) {
                pos = string.indexOf(subString, pos);
                if (pos >= 0) {
                    ++n;
                    pos += step;
                } else break;
            }
            return n;
        };

        return self;


    }

}());