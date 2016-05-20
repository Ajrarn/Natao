var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var del = require('del');
var rename = require("gulp-rename");
var gutil = require('gulp-util');
var fs = require('fs-extra');

var versionSDK = 'nwjs-sdk-v0.14.5';
var version = 'nwjs-v0.14.5';


var copyFiles = function (source, destination, callback) {
    fs.copy(source, destination, function (err) {
        if (err) {
            console.error(err);
        }
        callback();
    });
};



gulp.task('copy:Windows',function() {
    return gulp.src([ 'cache/' + versionSDK + '-win-x64/**/**' ]).pipe(gulp.dest('build/win64'));
});

gulp.task('copy:OSX',function(cb) {

    var src = 'cache/' + version + '-osx-x64';
    var dest = 'build/osx64/';

   copyFiles(src,dest,cb);
});

gulp.task('copy:Linux',function() {
    return gulp.src([
        'cache/' + versionSDK + '-linux-x64/**/**'
    ]).pipe(gulp.dest('build/linux64'));
});

gulp.task('copy:AppWindows',function() {
    return gulp.src([
        './app/**/*.*',
        '!./app/**/*.scss'
    ]).pipe(gulp.dest('build/win64'));
});

gulp.task('copy:AppLinux',function() {
    return gulp.src([
        './app/**/*.*',
        '!./app/**/*.scss'
    ]).pipe(gulp.dest('build/linux64'));
});

gulp.task('copy:AppOSX',function(cb) {
    var src = 'app';
    var dest = 'build/osx64/nwjs.app/Contents/Resources/app.nw';

    copyFiles(src,dest,cb);
});

gulp.task('osx:infoPlist',function(cb) {
    //return gulp.src(['mac/Info.plist']).pipe(gulp.dest('build/osx64/Natao.app/Contents'));

    var src = 'mac/Info.plist';
    var dest = 'build/osx64/nwjs.app/Contents';

    copyFiles(src,dest,cb);
});

gulp.task('cleanBuild',function() {
    return del(['build/**/*']);
});

gulp.task('internalBuild',gulpSequence('cleanBuild',['copy:Windows','copy:Linux','copy:OSX'],['copy:AppWindows','copy:AppLinux','copy:AppOSX']));

// *********************************** From here nothing works because of permissions, I will find how to do later

gulp.task('osx:enInfoPlistStrings',function(cb) {
    //return gulp.src(['mac/InfoPlist.strings']).pipe(gulp.dest('build/osx64/Natao.app/Contents/Resources/en.lproj'));

    var src = 'mac/en/InfoPlist.strings';
    var dest = 'build/osx64/nwjs.app/Contents/Resources/en.lproj/InfoPlist.strings';

    copyFiles(src,dest,cb);
});

gulp.task('osx:frInfoPlistStrings',function(cb) {

    var src = 'mac/fr/InfoPlist.strings';
    var dest = 'build/osx64/nwjs.app/Contents/Resources/fr.lproj/InfoPlist.strings';

    copyFiles(src,dest,cb);
});

gulp.task('osx:icon',function(cb) {
    var src = 'mac/Icon';
    var dest = 'build/osx64/nwjs.app/Icon';

    copyFiles(src,dest,cb);
});

gulp.task('finishOSX',gulpSequence('osx:infoPlist','osx:enInfoPlistStrings','osx:frInfoPlistStrings'));








