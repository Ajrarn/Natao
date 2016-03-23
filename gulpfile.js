var gulp = require('gulp');
var run = require('gulp-run');
var NwBuilder = require('nw-builder');
var gutil = require('gulp-util');

gulp.task('default', function() {
    var cmd = new run.Command('/Users/Christophe/Projets/node-webkit/nwjs-sdk-v0.13.0-rc3-osx-x64/nwjs.app/Contents/MacOS/nwjs /Users/Christophe/Projets/node-webkit/Natao');  // create a command object for `cat`.
    cmd.exec();
});


gulp.task('build',function() {
    var nw = new NwBuilder({
        version: '0.12.3',
        files: [ './**'],
        platforms: ['osx','win64','linux64']
    });

    // Log stuff you want
    nw.on('log', function (msg) {
        gutil.log('node-webkit-builder', msg);
    });

    // Build returns a promise, return it so the task isn't called in parallel
    return nw.build().catch(function (err) {
        gutil.log('node-webkit-builder', err);
    });
});
