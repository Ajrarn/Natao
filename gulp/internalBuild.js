var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var del = require('del');

gulp.task('copyWindows',function() {
    gulp.src([
        './cache/nwjs-v0.13.1-win-x64/**/*.*'
    ]).pipe(gulp.dest('./build/Natao/win64'));
});

gulp.task('copyLinux',function() {
    gulp.src([
        './cache/downloads/nwjs-v0.13.1-linux-x64/**/*.*'
    ]).pipe(gulp.dest('./build/Natao/linux64'));
});

gulp.task('copyAppWindows',function() {
    gulp.src([
        './app/**/*.*',
        '!./app/**/*.scss'
    ]).pipe(gulp.dest('./build/Natao/win64'));
});

gulp.task('copyAppLinux',function() {
    gulp.src([
        './app/**/*.*',
        '!./app/**/*.scss'
    ]).pipe(gulp.dest('./build/Natao/linux64'));
});



gulp.task('cleanBuild',function() {
    return del(['build/**/*']);
});

gulp.task('copyfile',gulpSequence(['copyWindows','copyLinux'],['copyAppWindows','copyAppLinux']));







gulp.task('internalBuild',gulpSequence('copyFile'));

