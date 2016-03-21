var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('default', function() {
    var cmd = new run.Command('/Users/Christophe/Projets/node-webkit/nwjs-sdk-v0.13.0-rc3-osx-x64/nwjs.app/Contents/MacOS/nwjs /Users/Christophe/Projets/node-webkit/Natao');  // create a command object for `cat`.
    cmd.exec();
});
