var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var run = require('gulp-run');
var NwBuilder = require('nw-builder');
var gutil = require('gulp-util');
var del = require('del');

require('./gulp/download');
require('./gulp/unzip');
require('./gulp/builds');
require('./gulp/internalBuild');

gulp.task('default', function() {
    var cmd = new run.Command('/Users/Christophe/Projets/node-webkit/nwjs-sdk-v0.14.0-osx-x64/nwjs.app/Contents/MacOS/nwjs /Users/Christophe/Projets/node-webkit/Natao/app');  // create a command object for `cat`.
    cmd.exec();
});




gulp.task('clean',gulpSequence(['cleanTemp','cleanBuild']));

