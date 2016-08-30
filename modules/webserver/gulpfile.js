var gulp = require('gulp');
var del = require('del');
const babel = require('gulp-babel');

gulp.task('default', ['build']);

gulp.task('build', ['build:compile', 'build:frontend']);

gulp.task('build:compile', ['clean'], function(){
    return gulp.src(['./src/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('build/'));w
});

gulp.task('build:frontend', ['clean'], function(){
    return gulp.src(['../frontend/build/**/*'])
        .pipe(gulp.dest('build/webroot/'));
});

gulp.task('clean', function(){
    return del([
        'build'
    ]);
});