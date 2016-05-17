var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var NwBuilder = require('nw-builder');
var gutil = require('gulp-util');
var fs = require('fs-extra');

gulp.task('buildOSX',function() {
    var nw = new NwBuilder({
        version: '0.14.5',
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

gulp.task('correctOSX',function(cb) {
    if (!fs.existsSync('build/Natao/osx64/nwjs.app/Contents/Resources/fr.lproj')) {
        /*return gulp.src(['cache/nwjs-sdk-v' + version + '-osx-x64/nwjs.app/Contents/Resources/*.lproj/*.*'])
            .pipe(gulp.dest('build/Natao/osx64/nwjs.app/Contents/Resources'));*/

        var src = 'cache/nwjs-sdk-v0.14.0-osx-x64/nwjs.app/Contents/Resources/*.lproj';
        var dest = 'build/Natao/osx64/nwjs.app/Contents/Resources';

        fs.copy(src, dest, function (err) {
            if (err) {
                console.error(err);
            }
            cb();
        });
    }
});

gulp.task('newCopyOSX',function(cb) {
    if (!fs.existsSync('build/Natao/osx64/nwjs.app/Contents/Resources/fr.lproj')) {
        /*return gulp.src(['cache/nwjs-sdk-v' + version + '-osx-x64/nwjs.app/Contents/Resources/*.lproj/*.*'])
         .pipe(gulp.dest('build/Natao/osx64/nwjs.app/Contents/Resources'));*/
        //console.log(fs.readdirSync('.'));
        var src = 'app';
        var dest = 'cache/nwjs-sdk-v0.14.0-osx-x64/nwjs.app/Contents/Resources/nw.app';

        fs.copy(src, dest, function (err) {
            if (err) {
                console.error(err);
            }
            cb();
        });
    }
});

gulp.task('buildAll',gulpSequence(['copyFile','buildOSX']));