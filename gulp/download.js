var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var request = require('request');
var fs = require('fs');


var fileBasePath = './downloads/nwjs-v';
var version = '0.14.0';
var urlBaseDownload = 'http://dl.nwjs.io/v' + version + '/nwjs-v' + version;


gulp.task('downloadWindows', function(cb) {
    var endFileName = '-win-x64.zip';
    if (fs.existsSync(fileBasePath + version + endFileName)) {
        cb();
    } else {
        return request(urlBaseDownload + endFileName).pipe(fs.createWriteStream(fileBasePath + version + endFileName));
    }
});

gulp.task('downloadWindowsSDK', function(cb) {
    var fileSDK = './downloads/nwjs-sdk-v' + version + '-win-x64.zip';
    var urlSDK = 'http://dl.nwjs.io/v' + version + '/nwjs-sdk-v' + version + '-win-x64.zip';
    if (fs.existsSync(fileSDK)) {
        cb();
    } else {
        return request(urlSDK).pipe(fs.createWriteStream(fileSDK));
    }
});

gulp.task('downloadOSX', function(cb) {
    var endFileName = '-osx-x64.zip';
    
    if (fs.existsSync(fileBasePath + version + endFileName)) {
        cb();
    } else {
        return request(urlBaseDownload + endFileName).pipe(fs.createWriteStream(fileBasePath + version + endFileName));
    }
    
});

gulp.task('downloadOSXSDK', function(cb) {
    var fileSDK = './downloads/nwjs-sdk-v' + version + '-osx-x64.zip';
    var urlSDK = 'http://dl.nwjs.io/v' + version + '/nwjs-sdk-v' + version + '-osx-x64.zip';
    if (fs.existsSync(fileSDK)) {
        cb();
    } else {
        return request(urlSDK).pipe(fs.createWriteStream(fileSDK));
    }

});

gulp.task('downloadLinux', function(cb) {
    var endFileName = '-linux-x64.tar.gz';

    if (fs.existsSync(fileBasePath + version + endFileName)) {
        cb();
    } else {
        return request(urlBaseDownload + endFileName).pipe(fs.createWriteStream(fileBasePath + version + endFileName));
    }

});

gulp.task('downloadAll', gulpSequence(['downloadWindows', 'downloadWindowsSDK','downloadLinux','downloadOSXSDK']));
