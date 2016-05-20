(function () {
    "use strict";

    module.exports = (gulp,gulpSequence,config) => {

        gulp.task('hello:world',function(cb) {
            console.log('config',config);
            cb();
        });


        gulp.task('copyFR:OSX',function(cb) {

            var dir = 'cache/nwjs-v' + config.version + '-osx-x64/nwjs.app/Contents/Resources/fr.lproj';
            fs.ensureDir(dir, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    var src = 'cache/osx64/contentSDK/Resources/fr.lproj/InfoPlist.strings';
                    var dest = 'cache/nwjs-' + config.version + '-osx-x64/nwjs.app/Contents/Resources/fr.lproj/InfoPlist.strings';

                    copyFiles(src,dest,cb);
                }

            })

        });

        gulp.task('copyFRVersions:OSX',function(cb) {

            var dir = 'cache/nwjs-' + version + '-osx-x64/nwjs.app/Contents/Versions/'+ versionChromium + '/nwjs Framework.framework/Resources/fr.lproj';
            fs.ensureDir(dir, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    var src = 'cache/osx64/contentSDK/Versions/' + versionChromium + '/nwjs Framework.framework/Resources/fr.lproj/locale.pak';
                    var dest = 'cache/nwjs-' + version + '-osx-x64/nwjs.app/Contents/Versions/'+ versionChromium + '/nwjs Framework.framework/Resources/fr.lproj/locale.pak';

                    copyFiles(src,dest,cb);
                }

            })

        });

        gulp.task('copyENGB:OSX',function(cb) {

            var dir = 'cache/nwjs-' + config.version + '-osx-x64/nwjs.app/Contents/Resources/en_GB.lproj';
            fs.ensureDir(dir, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    var src = 'cache/osx64/contentSDK/Resources/en_GB.lproj/InfoPlist.strings';
                    var dest = 'cache/nwjs-' + config.version + '-osx-x64/nwjs.app/Contents/Resources/en_GB.lproj/InfoPlist.strings';

                    copyFiles(src,dest,cb);
                }

            })

        });

        gulp.task('copyENGBVersions:OSX',function(cb) {

            var dir = 'cache/nwjs-' + version + '-osx-x64/nwjs.app/Contents/Resources/en_GB.lproj';
            fs.ensureDir(dir, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    var src = 'cache/osx64/contentSDK/Versions/' + versionChromium + '/nwjs Framework.framework/Resources/en_GB.lproj/locale.pak';
                    var dest = 'cache/nwjs-' + config.version + '-osx-x64/nwjs.app/Contents/Versions/'+ versionChromium + '/nwjs Framework.framework/Resources/en_GB.lproj/locale.pak';

                    copyFiles(src,dest,cb);
                }

            })

        });
        
        
        
        
        
        
    };
    

}());
