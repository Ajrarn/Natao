var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var run = require('gulp-run');
var fs = require('fs-extra');

var config = require('./gulp/config.json');

var download = require('./gulp/download')(gulp,gulpSequence,fs,config);
var unzip = require('./gulp/unzip');
var builds = require('./gulp/builds');
var internalBuild = require('./gulp/internalBuild');

var languages = require('./gulp/languages')(gulp,gulpSequence,config);






gulp.task('default', function() {
    //var cmd = new run.Command('/Users/Christophe/Projets/node-webkit/nwjs-sdk-v0.14.0-osx-x64/nwjs.app/Contents/MacOS/nwjs --enable-spell-checking /Users/Christophe/Projets/node-webkit/Natao/app');
    var cmd = new run.Command('/Users/Christophe/Projets/node-webkit/nwjs-sdk-v0.14.0-osx-x64/nwjs.app/Contents/MacOS/nwjs /Users/Christophe/Projets/node-webkit/Natao/app');
    cmd.exec();
});




gulp.task('clean',gulpSequence(['cleanTemp','cleanBuild']));

