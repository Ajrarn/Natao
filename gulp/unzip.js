var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var fs = require('fs-extra');
var del = require('del');
var run = require('gulp-run');

var fileBasePath = './downloads/nwjs-';
var versionSdk = 'sdk-v0.14.5';
var version = 'v0.14.5';
var versionChromium = '50.0.2661.102';

var copyFiles = function (source, destination, callback) {
    fs.copy(source, destination, function (err) {
        if (err) {
            console.error(err);
        }
        callback();
    });
};


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

gulp.task('unzip:WindowsSDK',function() {
    var endFileName = '-win-x64.zip';

    // unzip with command line to keep the executables executables
    var cmd = new run.Command('unzip ' + fileBasePath + versionSdk + endFileName + ' -d ./cache');
    cmd.exec();
});


gulp.task('unzip:OSXSDK',function() {
    var endFileName = '-osx-x64.zip';
    // unzip with command line to keep the executables executables
    var cmd = new run.Command('unzip ' + fileBasePath + versionSdk + endFileName + ' -d ./cache');
    cmd.exec();
});


gulp.task('unzip:LinuxSDK',function() {
    var endFileName = '-linux-x64.tar.gz';
    // unzip with command line to keep the executables executables
    var cmd = new run.Command('gunzip -c '+ fileBasePath + versionSdk + endFileName +' | tar -C cache -xopf -');
    cmd.exec();
    
});


gulp.task('correct:Windows',function() {
    if (!fs.existsSync('cache/nwjs-' + version + '-win-x64/locales/fr.pak')) {
        return gulp.src(['cache/nwjs-' + versionSdk + '-win-x64/locales/*.*'])
            .pipe(gulp.dest('./cache/nwjs-' + version + '-win-x64/locales'));
    }
});

gulp.task('correct:Linux',function() {
    if (!fs.existsSync('cache/downloads/nwjs-' + versionSdk + '-linux-x64/locales/fr.pak')) {
        return gulp.src(['cache/nwjs-' + versionSdk + '-win-x64/locales/*.*'])
            .pipe(gulp.dest('./cache/downloads/nwjs-' + version + '-linux-x64/locales'));
    }
});

gulp.task('extractResources:OSX',function(cb) {
    var src = 'cache/nwjs-' + versionSdk + '-osx-x64/nwjs.app/Contents/Resources';
    var dest = 'cache/osx64/contentSDK/Resources';

    copyFiles(src,dest,cb);
});

gulp.task('extractVersions:OSX',function(cb) {
    var src = 'cache/nwjs-' + versionSdk + '-osx-x64/nwjs.app/Contents/Versions';
    var dest = 'cache/osx64/contentSDK/Versions';

    copyFiles(src,dest,cb);
});





gulp.task('cleanCache',function() {
    return del(['cache/**/*']);
});

gulp.task('unzip',gulpSequence('cleanCache',['unzip:Windows','unzip:Linux','unzip:OSX','unzip:WindowsSDK','unzip:LinuxSDK','unzip:OSXSDK']));

