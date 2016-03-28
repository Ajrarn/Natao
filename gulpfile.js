var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var run = require('gulp-run');
var NwBuilder = require('nw-builder');
var gutil = require('gulp-util');
var del = require('del');

require('./gulp/download');
require('./gulp/unzip');
require('./gulp/internalBuild');

gulp.task('default', function() {
    var cmd = new run.Command('/Users/Christophe/Projets/node-webkit/nwjs-sdk-v0.13.0-rc3-osx-x64/nwjs.app/Contents/MacOS/nwjs /Users/Christophe/Projets/node-webkit/Natao/app');  // create a command object for `cat`.
    cmd.exec();
});

gulp.task('testTemp', function() {
    var cmd = new run.Command('/Users/Christophe/Projets/node-webkit/nwjs-sdk-v0.13.0-rc3-osx-x64/nwjs.app/Contents/MacOS/nwjs /Users/Christophe/Projets/node-webkit/Natao/temp');  // create a command object for `cat`.
    cmd.exec();
});

gulp.task('cleanBuild',function() {
    return del(['build/**/*']);
});

gulp.task('clean',gulpSequence(['cleanTemp','cleanBuild']));

gulp.task('build',function() {
    var nw = new NwBuilder({
        version: '0.13.1',
        files: [ './app/**/**.*'],
        //platforms: ['osx64','win64'],
        platforms: ['win64'],
        appName:'Natao',
        appVersion:'0.1.0',
        macIcns:'./app/Natao.icns'
    });

    // Log stuff you want
    nw.on('log', function (msg) {
        gutil.log('node-webkit-builder', msg);
    });

    // Build returns a promise, return it so the task isn't called in parallel
    return nw.build().catch(function (err) {
        gutil.log('node-webkit-builder', err);
    });
});

