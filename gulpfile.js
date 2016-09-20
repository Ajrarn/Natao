var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var run = require('gulp-run');
const exec = require('child_process').exec;
var fs = require('fs-extra');
var del = require('del');

var config = require('./gulp/config.json');

var download = require('./gulp/download')(gulp,gulpSequence,fs,config);
var unzip = require('./gulp/unzip')(gulp,gulpSequence,fs,exec,config);
var copy = require('./gulp/copy')(gulp,gulpSequence,fs,config);

var languages = require('./gulp/languages')(gulp,gulpSequence,fs,config);


//Start on my computer for tests
gulp.task('start:myOSX', function() {
    //exec('/Users/Christophe/Projets/node-webkit/nwjs-sdk-v0.17.1-osx-x64/nwjs.app/Contents/MacOS/nwjs --enable-spell-checking /Users/Christophe/Projets/node-webkit/Natao/app',function(err) {
    exec('/Users/Christophe/Projets/node-webkit/nwjs-sdk-v0.17.3-osx-x64/nwjs.app/Contents/MacOS/nwjs /Users/Christophe/Projets/node-webkit/Natao/app',function(err) {
        if (err) {
            console.error(err);
        }
    });
});



// ******** clean *********
gulp.task('clean:nwjs',function() {
    return del([ config.unzipFolder + '/**/*']);
});

gulp.task('clean:download',function() {
    return del([ config.downloadFolder + '/**/*']);
});

gulp.task('clean:final',function() {
    return del([ config.buildFolder + '/**/*']);
});


gulp.task('clean:All',gulpSequence(['clean:download','clean:nwjs','clean:final']));


// ******************** builds ****************

gulp.task('build:fromStart', gulpSequence('clean:All','download:All','unzip:All','languages:All','copy:All'));

gulp.task('build:fromPreviousNwjsVersion',gulpSequence('clean:final','copy:All'));


//********* default task ***********$

gulp.task('default', ['start:myOSX']);

