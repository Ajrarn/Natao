var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var unzip = require('gulp-unzip');
var gunzip = require('gulp-gunzip');
var untar = require('gulp-untar');
var fs = require('fs');
var del = require('del');

var fileBasePath = './downloads/nwjs-v';
var version = '0.13.3';

gulp.task('unzipWindows',function() {
    var endFileName = '-win-x64.zip';
    return gulp.src(fileBasePath + version + endFileName)
        .pipe(unzip())
        .pipe(gulp.dest('./cache'))
});

gulp.task('unzipWindowsSDK',function() {
    var endFileName = '-win-x64.zip';
    return gulp.src('./downloads/nwjs-sdk-v' + version + '-win-x64.zip')
        .pipe(unzip())
        .pipe(gulp.dest('./cache'));
});

gulp.task('unzipOSX',function() {
    var endFileName = '-osx-x64.zip';
    return gulp.src(fileBasePath + version + endFileName)
        .pipe(unzip())
        .pipe(gulp.dest('./cache'));
});

gulp.task('unzipLinux',function() {
    var endFileName = '-linux-x64.tar.gz';

    return gulp.src(fileBasePath + version + endFileName)
        .pipe(gunzip())
        .pipe(untar())
        .pipe(gulp.dest('./cache'));
});

gulp.task('correctWindows',function() {
    if (!fs.existsSync('cache/nwjs-v' + version + '-win-x64/locales/fr.pak')) {
        return gulp.src(['cache/nwjs-sdk-v' + version + '-win-x64/locales/*.*'])
            .pipe(gulp.dest('./cache/nwjs-v' + version + '-win-x64/locales'));
    }
});

gulp.task('correctLinux',function() {
    if (!fs.existsSync('cache/downloads/nwjs-v' + version + '-linux-x64/locales/fr.pak')) {
        return gulp.src(['cache/nwjs-sdk-v' + version + '-win-x64/locales/*.*'])
            .pipe(gulp.dest('./cache/downloads/nwjs-v' + version + '-linux-x64/locales'));
    }
});

gulp.task('cleanCache',function() {
    return del(['cache/**/*']);
});

gulp.task('unzipAll',gulpSequence('cleanCache',['unzipWindows', 'unzipOSX', 'unzipWindowsSDK','unzipLinux'],['correctWindows','correctLinux']));
