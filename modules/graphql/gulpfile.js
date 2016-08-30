var gulp = require('gulp');
var del = require('del');
const babel = require('gulp-babel');

gulp.task('default', ['build']);

gulp.task('build', ['clean'], function(){
    return gulp.src(['./src/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('build/'));
});

gulp.task('clean', function(){
    return del([
        'build'
    ]);
});