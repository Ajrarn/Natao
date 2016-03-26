var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var del = require('del');

gulp.task('copyBower',function() {
    gulp.src([
        './bower_components/**/**.js',
        './bower_components/**/**.json',
        './bower_components/**/**.html',
        './bower_components/**/**.svg',
        './bower_components/**/**.png',
        './bower_components/**/**.eot',
        './bower_components/**/**.ttf',
        './bower_components/**/**.woff',
        './bower_components/**/**.css'
    ]).pipe(gulp.dest('./temp/bower_components'));
});

gulp.task('copyNode',function() {
    gulp.src([
        './node_modules/**/**.js',
        './node_modules/**/**.json',
        './node_modules/**/**.html',
        './node_modules/**/**.css'
    ]).pipe(gulp.dest('./temp/node_modules'));
});


gulp.task('copySrc',function() {
    gulp.src([
        './src/**/**.*',
        './src/**/**.html',
        './src/**/**.js',
        './src/**/**.png',
        './src/**/**.css'
    ]).pipe(gulp.dest('./temp/src'));
});

gulp.task('copyLanguages',function() {
    gulp.src([
        './languages/**/**.*'
    ]).pipe(gulp.dest('./temp/languages'));
});

gulp.task('copyRoot',function() {
    gulp.src([
        './help.html',
        './index.html',
        './app.icns',
        './Natao.png',
        'package.json'
    ]).pipe(gulp.dest('./temp'));
});

gulp.task('cleanTemp',function() {
    return del(['temp/**/*']);
});

gulp.task('copyfile',gulpSequence(['copyBower','copyNode','copySrc','copyLanguages','copyRoot']));







gulp.task('internalBuild',gulpSequence('copyFile'));

