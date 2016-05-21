(function () {
    "use strict";

    module.exports = (gulp,gulpSequence,fs,config) => {
        
        
        var copyFiles = function (source, destination, callback) {
            fs.copy(source, destination, function (err) {
                if (err) {
                    console.error(err);
                }
                callback();
            });
        };
        
        
        gulp.task('copy:NwjsWin64',function(cb) {
            
            var src = config.unzipFolder +'/nwjs-v' + config.version + '-win-x64';
            var dest = config.buildFolder + '/win64/';

            copyFiles(src,dest,cb);
        });
        
        gulp.task('copy:NwjsOSX64',function(cb) {
        
            var src = config.unzipFolder +'/nwjs-v' + config.version + '-osx-x64';
            var dest = config.buildFolder + '/osx64/';
            
            copyFiles(src,dest,cb);
        });
        
        gulp.task('copy:NwjsLinux64',function(cb) {

            var src = config.unzipFolder +'/nwjs-v' + config.version + '-linux-x64';
            var dest = config.buildFolder + '/linux64/';

            copyFiles(src,dest,cb);
        });
        
        gulp.task('copy:AppWin64',function(cb) {
            var src = 'app';
            var dest = config.buildFolder + '/win64';

            copyFiles(src,dest,cb);
        });
        
        gulp.task('copy:AppLinux64',function(cb) {
            var src = 'app';
            var dest = config.buildFolder + '/linux64';

            copyFiles(src,dest,cb);
        });
        
        gulp.task('copy:AppOSX64',function(cb) {
            var src = 'app';
            var dest = config.buildFolder + '/osx64/nwjs.app/Contents/Resources/app.nw';
        
            copyFiles(src,dest,cb);
        });
        
        
        gulp.task('copy:All',gulpSequence(['copy:NwjsWin64','copy:NwjsLinux64','copy:NwjsOSX64'],['copy:AppWin64','copy:AppLinux64','copy:AppOSX64']));
        
        
        

    };


}());









