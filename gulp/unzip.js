(function () {
    "use strict";

    module.exports = (gulp,gulpSequence,fs,run,config) => {
     
        var fileBasePathSDK = './'+ config.downloadFolder +'/nwjs-sdk-v' + config.version;
        var fileBasePathNormal = './'+ config.downloadFolder +'/nwjs-v' + config.version;
        
        
        
        
        gulp.task('unzip:Windows',function() {
            var endFileName = '-win-x64.zip';
        
            // unzip with command line to keep the executables executables
            var cmd = new run.Command('unzip ' + fileBasePathNormal + endFileName + ' -d ./' + config.unzipFolder);
            cmd.exec();
        });
        
        
        gulp.task('unzip:OSX',function() {
            var endFileName = '-osx-x64.zip';
            // unzip with command line to keep the executables executables
            var cmd = new run.Command('unzip ' + fileBasePathNormal + endFileName + ' -d ./' + config.unzipFolder);
            cmd.exec();
        });
        
        
        gulp.task('unzip:Linux',function() {
            var endFileName = '-linux-x64.tar.gz';
            // unzip with command line to keep the executables executables
            var cmd = new run.Command('gunzip -c '+ fileBasePathNormal + endFileName +' | tar -C ' + config.unzipFolder + ' -xopf -');
            cmd.exec();
        
        });
        
        gulp.task('unzip:WindowsSDK',function() {
            var endFileName = '-win-x64.zip';
        
            // unzip with command line to keep the executables executables
            var cmd = new run.Command('unzip ' + fileBasePathSDK + endFileName + ' -d ./' + config.unzipFolder);
            cmd.exec();
        });
        
        
        gulp.task('unzip:OSXSDK',function() {
            var endFileName = '-osx-x64.zip';
            // unzip with command line to keep the executables executables
            var cmd = new run.Command('unzip ' + fileBasePathSDK + endFileName + ' -d ./' + config.unzipFolder);
            cmd.exec();
        });
        
        
        gulp.task('unzip:LinuxSDK',function() {
            var endFileName = '-linux-x64.tar.gz';
            // unzip with command line to keep the executables executables
            var cmd = new run.Command('gunzip -c '+ fileBasePathSDK + endFileName +' | tar -C ' + config.unzipFolder + ' -xopf -');
            cmd.exec();
            
        });
        
        
        gulp.task('unzip:All',gulpSequence(['unzip:Windows','unzip:Linux','unzip:OSX','unzip:WindowsSDK','unzip:LinuxSDK','unzip:OSXSDK']));

    };


}());

