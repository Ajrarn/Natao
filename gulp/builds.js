var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var NwBuilder = require('nw-builder');
var gutil = require('gulp-util');

gulp.task('buildOSX',function() {
    var nw = new NwBuilder({
        version: '0.14.0',
        files: [ './app/**/**.*'],
        //platforms: ['osx64','win64'],
        platforms: ['osx64'],
        appName:'Natao',
        appVersion:'0.1.0',
        macIcns:'./app/app.icns'
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

gulp.task('buildAll',gulpSequence(['copyFile','buildOSX']));