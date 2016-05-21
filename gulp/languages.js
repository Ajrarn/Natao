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
        
        
        // ******************** OSX ********************************
        
        gulp.task('languages:extractVersionsOSX64',function(cb) {
            var src = config.unzipFolder + '/nwjs-sdk-v' + config.version + '-osx-x64/nwjs.app/Contents/Versions';
            var dest = config.unzipFolder + '/osx64/contentSDK/Versions';

            copyFiles(src,dest,cb);
        });

        
        
        gulp.task('languages:OSXInfoPList64',function(cb) {
            var nbLanguagesPending = config.languages.length;
            config.languages.forEach(function(item) {

                var dir = config.unzipFolder + '/nwjs-v' + config.version + '-osx-x64/nwjs.app/Contents/Resources/' + item.language + '.lproj';
                fs.ensureDir(dir, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        var src = item.infoPlistFolder + '/InfoPlist.strings';
                        var dest = dir + '/InfoPlist.strings';

                        copyFiles(src,dest,function() {
                            nbLanguagesPending--;
                            
                            if (nbLanguagesPending === 0) {
                                cb();
                            }
                            
                        });
                    }

                })
            })
        });
        
        gulp.task('languages:OSXlocales64',function(cb) {

            var versionChromium;

            fs.readdir(config.unzipFolder + '/osx64/contentSDK/Versions',function(err,files) {
                if (err) {
                    console.error(err);
                    cb();
                } else {
                    versionChromium = files[0];

                    var nbLanguagesPending = config.languages.length - 1;
                    config.languages.forEach(function(item) {

                        if (item.language !== 'en') {
                            var dir = config.unzipFolder + '/nwjs-v' + config.version + '-osx-x64/nwjs.app/Contents/Versions/'+ versionChromium + '/nwjs Framework.framework/Resources/' + item.language + '.lproj';
                            fs.ensureDir(dir, function (err) {
                                if (err) {
                                    console.error(err);
                                    cb();
                                } else {
                                    var src = config.unzipFolder + '/osx64/contentSDK/Versions/' + versionChromium + '/nwjs Framework.framework/Resources/' + item.language + '.lproj/locale.pak';
                                    var dest = dir + '/locale.pak';

                                    fs.copy(src,dest,function(err) {
                                        if (err) {
                                            console.error(err);
                                        }

                                        nbLanguagesPending--;

                                        if (nbLanguagesPending === 0) {
                                            cb();
                                        }
                                    });
                                }
                            })
                        }
                    })
                }
            });
        });
        
        
        gulp.task('languages:OSX64',gulpSequence('languages:extractVersionsOSX64','languages:OSXlocales64','languages:OSXInfoPList64'));


        // ******************** Windows ********************************
        
        

        gulp.task('languages:Win64',function(cb) {

            var nbLanguagesPending = config.languages.length - 1;
            config.languages.forEach(function(item) {

                let src = config.unzipFolder + '/nwjs-sdk-v' + config.version + '-win-x64/locales/' + item.language.replace('_','-') + '.pak';
                let dest = config.unzipFolder + '/nwjs-v' + config.version + '-win-x64/locales/' + item.language.replace('_','-') + '.pak';

                if (item.language !== 'en') {
                    fs.copy(src,dest,function(err) {
                        if (err) {
                            console.error(err);
                        }

                        nbLanguagesPending--;

                        if (nbLanguagesPending === 0) {
                            cb();
                        }
                    });

                }
            });

        });

        // ******************** Linux ********************************

        gulp.task('languages:Linux',function() {
            if (!fs.existsSync('cache/downloads/nwjs-' + versionSdk + '-linux-x64/locales/fr.pak')) {
                return gulp.src(['cache/nwjs-' + versionSdk + '-win-x64/locales/*.*'])
                    .pipe(gulp.dest('./cache/downloads/nwjs-' + version + '-linux-x64/locales'));
            }
        });
        
        
        
        
        // ****************** All ********************
        gulp.task('languages:All', ['languages:Win64','languages:OSX64'])
        
    };
    

}());
