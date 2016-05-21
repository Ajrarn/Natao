(function () {
    "use strict";

    module.exports = (gulp,gulpSequence,fs,exec,config) => {
     
        var fileBasePathSDK = './'+ config.downloadFolder +'/nwjs-sdk-v' + config.version;
        var fileBasePathNormal = './'+ config.downloadFolder +'/nwjs-v' + config.version;

        
        gulp.task('unzip:Windows',function(cb) {
            var endFileName = '-win-x64.zip';
            
            exec('unzip ' + fileBasePathNormal + endFileName + ' -d ./' + config.unzipFolder, (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                }
                cb()
            });


        });
        
        
        gulp.task('unzip:OSX',function(cb) {
            var endFileName = '-osx-x64.zip';
            // unzip with command line to keep the executables executables
            exec('unzip ' + fileBasePathNormal + endFileName + ' -d ./' + config.unzipFolder, (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                }
                cb()
            });
        });
        
        
        gulp.task('unzip:Linux',function(cb) {
            var endFileName = '-linux-x64.tar.gz';
            // unzip with command line to keep the executables executables
            exec('gunzip -c '+ fileBasePathNormal + endFileName +' | tar -C ' + config.unzipFolder + ' -xopf -', (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                }
                cb()
            });
        
        });
        
        gulp.task('unzip:WindowsSDK',function(cb) {
            var endFileName = '-win-x64.zip';
        
            // unzip with command line to keep the executables executables
            exec('unzip ' + fileBasePathSDK + endFileName + ' -d ./' + config.unzipFolder, (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                }
                cb()
            });
        });
        
        
        gulp.task('unzip:OSXSDK',function(cb) {
            var endFileName = '-osx-x64.zip';
            // unzip with command line to keep the executables executables
            exec('unzip ' + fileBasePathSDK + endFileName + ' -d ./' + config.unzipFolder, (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                }
                cb()
            });
        });
        
        
        gulp.task('unzip:LinuxSDK',function(cb) {
            var endFileName = '-linux-x64.tar.gz';
            // unzip with command line to keep the executables executables
            exec('gunzip -c '+ fileBasePathSDK + endFileName +' | tar -C ' + config.unzipFolder + ' -xopf -', (error) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                }
                cb()
            });
            
        });
        
        
        gulp.task('unzip:All',gulpSequence(['unzip:Windows','unzip:Linux','unzip:OSX','unzip:WindowsSDK','unzip:LinuxSDK','unzip:OSXSDK']));

    };


}());

