(function () {
    "use strict";

    module.exports = (gulp,gulpSequence,config) => {

        var versionChromium = '50.0.2661.102';
        
        
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
        
        
        
        
    };
    

}());
