var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var del = require('del');
var rename = require("gulp-rename");
var gutil = require('gulp-util');


var version = '0.13.4';

gulp.task('copyWindows',function() {
    return gulp.src([ 'cache/nwjs-v' + version + '-win-x64/**/**' ]).pipe(gulp.dest('build/win64'));
});

gulp.task('copyOSX',function() {
    return gulp.src([
        'cache/nwjs-v' + version + '-osx-x64/nwjs.app/**/**'
    ]).pipe(gulp.dest('build/osx64/nwjs.app'));
});

gulp.task('copyLinux',function() {
    return gulp.src([
        'cache/downloads/nwjs-v' + version + '-linux-x64/**/**'
    ]).pipe(gulp.dest('build/linux64'));
});

gulp.task('copyAppWindows',function() {
    return gulp.src([
        './app/**/*.*',
        '!./app/**/*.scss'
    ]).pipe(gulp.dest('build/win64'));
});

gulp.task('copyAppLinux',function() {
    return gulp.src([
        './app/**/*.*',
        '!./app/**/*.scss'
    ]).pipe(gulp.dest('build/linux64'));
});

gulp.task('copyAppOSX',function() {
    return gulp.src([
        './app/**/*.*',
        '!./app/**/*.scss'
    ]).pipe(gulp.dest('build/osx64/nwjs.app/Contents/Resources/app.nw'));
});

gulp.task('infoPlistOSX',function() {
    return gulp.src(['mac/Info.plist']).pipe(gulp.dest('build/osx64/Natao.app/Contents'));
});

gulp.task('infoPlistStringsOSX',function() {
    return gulp.src(['mac/InfoPlist.strings']).pipe(gulp.dest('build/osx64/Natao.app/Contents/Resources/en.lproj'));
});

gulp.task('iconOSX',function() {
    return gulp.src(['app/natao.icns'])
        .pipe(rename('app.icns'))
        .pipe(gulp.dest('build/osx64/nwjs.app/Contents/Resources'));
});

gulp.task('finishOSX',gulpSequence(['infoPlistOSX','infoPlistStringsOSX','iconOSX']));



gulp.task('cleanBuild',function() {
    return del(['build/**/*']);
});

gulp.task('copyCache',function() {
    gulp.src([
        'cache/nwjs-v0.13.4-osx-x64/**/*.*'
    ]).pipe(gulp.dest('./build/linux64'));
});

gulp.task('internalBuild',gulpSequence('cleanBuild',['copyWindows','copyLinux'],['copyAppWindows','copyAppLinux'],'buildOSX'));
//gulp.task('internalBuild',gulpSequence('cleanBuild', 'copyWindows'));



