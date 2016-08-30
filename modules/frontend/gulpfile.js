var gulp = require('gulp');
var del = require('del');
const webpack = require('gulp-webpack');

gulp.task('default', ['build']);

gulp.task('build', ['build:compile', 'build:webroot']);

gulp.task('build:compile', ['clean'], function(){
    return gulp.src(['./src/js/**/*.js'])
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('build:webroot', ['clean'], function(){
    return gulp.src(['./src/webroot/**/*'])
        .pipe(gulp.dest('build/'));
});

gulp.task('clean', function(){
    return del([
        'build'
    ]);
});