var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var unzip = require('gulp-unzip');
var gunzip = require('gulp-gunzip');
var untar = require('gulp-untar');

var fileBasePath = './downloads/nwjs-v0.13.0-';

gulp.task('unzipWindows',function() {
    var endFileName = 'win-x64.zip';
    gulp.src(fileBasePath + endFileName)
        .pipe(unzip())
        .pipe(gulp.dest('./cache'))
});

gulp.task('unzipOSX',function() {
    var endFileName = 'osx-x64.zip';
    gulp.src(fileBasePath + endFileName)
        .pipe(unzip())
        .pipe(gulp.dest('./cache'))
});

gulp.task('unzipLinux',function() {
    var endFileName = 'linux-x64.tar.gz';

    return gulp.src(fileBasePath + endFileName)
        .pipe(gunzip())
        .pipe(untar())
        .pipe(gulp.dest('./cache'))
});

gulp.task('unzipAll',gulpSequence(['unzipWindows', 'unzipOSX','unzipLinux']))
