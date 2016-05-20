(function () {
    "use strict";

    module.exports = (gulp,gulpSequence,fs,config) => {
        
        var request = require('request');
        
        var fileBasePathNormal = './' + config.downLoadFolder + '/nwjs-v' + config.version;
        var urlBaseDownloadNormal = 'http://dl.nwjs.io/v' + config.version + '/nwjs-v' + config.version;

        var fileBasePathSDK = './' + config.downLoadFolder + '/nwjs-sdk-v' + config.version;
        var urlBaseDownloadSDK = 'http://dl.nwjs.io/v' + config.version + '/nwjs-sdk-v' + config.version;
        
        
        gulp.task('download:Win64', function(cb) {
            var endFileName = '-win-x64.zip';
            
            if (fs.existsSync(fileBasePathNormal + endFileName)) {
                cb();
            } else {
                return request(urlBaseDownloadNormal + endFileName).pipe(fs.createWriteStream(fileBasePathNormal + endFileName));
            }
        });
        
        gulp.task('download:Win64SDK', function(cb) {
            var endFileName = '-win-x64.zip';
            
            if (fs.existsSync(fileBasePathSDK + endFileName)) {
                cb();
            } else {
                return request(urlBaseDownloadSDK + endFileName).pipe(fs.createWriteStream(fileBasePathSDK + endFileName));
            }
            
        });
        
        gulp.task('download:OSX64', function(cb) {
            var endFileName = '-osx-x64.zip';

            if (fs.existsSync(fileBasePathNormal + endFileName)) {
                cb();
            } else {
                return request(urlBaseDownloadNormal + endFileName).pipe(fs.createWriteStream(fileBasePathNormal + endFileName));
            }
            
        });
        
        gulp.task('download:OSX64SDK', function(cb) {
            var endFileName = '-osx-x64.zip';
            
            if (fs.existsSync(fileBasePathSDK + endFileName)) {
                cb();
            } else {
                return request(urlBaseDownloadSDK + endFileName).pipe(fs.createWriteStream(fileBasePathSDK + endFileName));
            }
        });
        
        gulp.task('download:Linux64', function(cb) {
            var endFileName = '-linux-x64.tar.gz';

            if (fs.existsSync(fileBasePathNormal + endFileName)) {
                cb();
            } else {
                return request(urlBaseDownloadNormal + endFileName).pipe(fs.createWriteStream(fileBasePathNormal + endFileName));
            }
        
        });
        
        gulp.task('download:Linux64SDK', function(cb) {
            var endFileName = '-linux-x64.tar.gz';

            if (fs.existsSync(fileBasePathSDK + endFileName)) {
                cb();
            } else {
                return request(urlBaseDownloadSDK + endFileName).pipe(fs.createWriteStream(fileBasePathSDK + endFileName));
            }
        });
        
        
        
        gulp.task('download:Normal64', gulpSequence(['download:Win64','download:Linux64','download:OSX64']));
        
        gulp.task('download:SDK64', gulpSequence([ 'download:Win64SDK','download:Linux64SDK','download:OSX64SDK']));
        
        gulp.task('download:All',gulpSequence(['download:Normal64','download:SDK64']));

    };


}());
