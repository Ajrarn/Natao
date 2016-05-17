var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var request = require('request');
var fs = require('fs');


var fileBasePath = './downloads/nwjs-v';
var version = '0.14.5';
var urlBaseDownload = 'http://dl.nwjs.io/v' + version + '/nwjs-v' + version;


gulp.task('download:Windows', function(cb) {
    var endFileName = '-win-x64.zip';
    if (fs.existsSync(fileBasePath + version + endFileName)) {
        cb();
    } else {
        return request(urlBaseDownload + endFileName).pipe(fs.createWriteStream(fileBasePath + version + endFileName));
    }
});

gulp.task('download:WindowsSDK', function(cb) {
    var fileSDK = './downloads/nwjs-sdk-v' + version + '-win-x64.zip';
    var urlSDK = 'http://dl.nwjs.io/v' + version + '/nwjs-sdk-v' + version + '-win-x64.zip';
    if (fs.existsSync(fileSDK)) {
        cb();
    } else {
        return request(urlSDK).pipe(fs.createWriteStream(fileSDK));
    }
});

gulp.task('download:OSX', function(cb) {
    var endFileName = '-osx-x64.zip';
    
    if (fs.existsSync(fileBasePath + version + endFileName)) {
        cb();
    } else {
        return request(urlBaseDownload + endFileName).pipe(fs.createWriteStream(fileBasePath + version + endFileName));
    }
    
});

gulp.task('download:OSXSDK', function(cb) {
    var fileSDK = './downloads/nwjs-sdk-v' + version + '-osx-x64.zip';
    var urlSDK = 'http://dl.nwjs.io/v' + version + '/nwjs-sdk-v' + version + '-osx-x64.zip';
    if (fs.existsSync(fileSDK)) {
        cb();
    } else {
        return request(urlSDK).pipe(fs.createWriteStream(fileSDK));
    }
});

gulp.task('download:Linux', function(cb) {
    var endFileName = '-linux-x64.tar.gz';

    if (fs.existsSync(fileBasePath + version + endFileName)) {
        cb();
    } else {
        return request(urlBaseDownload + endFileName).pipe(fs.createWriteStream(fileBasePath + version + endFileName));
    }

});

gulp.task('download:LinuxSDK', function(cb) {
    var fileSDK = './downloads/nwjs-sdk-v' + version + '-linux-x64.tar.gz';
    var urlSDK = 'http://dl.nwjs.io/v' + version + '/nwjs-sdk-v' + version + '-linux-x64.tar.gz';
    if (fs.existsSync(fileSDK)) {
        cb();
    } else {
        return request(urlSDK).pipe(fs.createWriteStream(fileSDK));
    }
});

gulp.task('download:Normal', gulpSequence(['download:Windows', 'download:Windows','download:Linux','download:OSX']));

gulp.task('download:SDK', gulpSequence([ 'download:WindowsSDK','download:LinuxSDK','download:OSXSDK']));
