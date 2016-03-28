var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var request = require('request');
var fs = require('fs');

var urlBaseDownload = 'http://dl.nwjs.io/v0.13.1/nwjs-v0.13.1-';
var fileBasePath = './downloads/nwjs-v0.13.1-';


gulp.task('downloadWindows', function(cb) {
    var endFileName = 'win-x64.zip';

    if (fs.existsSync(fileBasePath + endFileName)) {
        cb();
    } else {
        return request(urlBaseDownload + endFileName).pipe(fs.createWriteStream(fileBasePath + endFileName));
    }

});

gulp.task('downloadOsX', function(cb) {
    var endFileName = 'osx-x64.zip';
    
    if (fs.existsSync(fileBasePath + endFileName)) {
        cb();
    } else {
        return request(urlBaseDownload + endFileName).pipe(fs.createWriteStream(fileBasePath + endFileName));
    }
    
});

gulp.task('downloadLinux', function(cb) {
    var endFileName = 'linux-x64.tar.gz';

    if (fs.existsSync(fileBasePath + endFileName)) {
        cb();
    } else {
        return request(urlBaseDownload + endFileName).pipe(fs.createWriteStream(fileBasePath + endFileName));
    }

});

gulp.task('downloadAll', gulpSequence(['downloadWindows', 'downloadOsX','downloadLinux']));
