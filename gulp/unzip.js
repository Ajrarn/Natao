var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var fs = require('fs');
var del = require('del');
var run = require('gulp-run');

var fileBasePath = './downloads/nwjs-';
var version = 'sdk-v0.14.0';

gulp.task('unzip:Windows',function() {
    var endFileName = '-win-x64.zip';

    // unzip with command line to keep the executables executables
    var cmd = new run.Command('unzip ' + fileBasePath + version + endFileName + ' -d ./cache');
    cmd.exec();
});


gulp.task('unzip:OSX',function() {
    var endFileName = '-osx-x64.zip';
    // unzip with command line to keep the executables executables
    var cmd = new run.Command('unzip ' + fileBasePath + version + endFileName + ' -d ./cache');
    cmd.exec();
});


gulp.task('unzip:Linux',function() {
    var endFileName = '-linux-x64.tar.gz';
    // unzip with command line to keep the executables executables
    var cmd = new run.Command('gunzip -c '+ fileBasePath + version + endFileName +' | tar -C cache -xopf -');
    cmd.exec();
    
});


gulp.task('correct:Windows',function() {
    if (!fs.existsSync('cache/nwjs-v' + version + '-win-x64/locales/fr.pak')) {
        return gulp.src(['cache/nwjs-sdk-v' + version + '-win-x64/locales/*.*'])
            .pipe(gulp.dest('./cache/nwjs-v' + version + '-win-x64/locales'));
    }
});

gulp.task('correct:Linux',function() {
    if (!fs.existsSync('cache/downloads/nwjs-v' + version + '-linux-x64/locales/fr.pak')) {
        return gulp.src(['cache/nwjs-sdk-v' + version + '-win-x64/locales/*.*'])
            .pipe(gulp.dest('./cache/downloads/nwjs-v' + version + '-linux-x64/locales'));
    }
});



gulp.task('cleanCache',function() {
    return del(['cache/**/*']);
});

gulp.task('unzip',gulpSequence('cleanCache',['unzip:Windows', 'unzip:Windows','unzip:Linux','unzip:OSX'],'correct:Linux'));

