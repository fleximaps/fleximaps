var gulp = require('gulp');
var del = require('del');
var fs = require('fs');
var babel = require('gulp-babel');
var graphql = require('graphql').graphql;
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var path = require('path');

gulp.task('default', ['build']);

gulp.task('build', ['build:compile', 'build:schema']);

gulp.task('build:compile', ['clean'], function(){
    return gulp.src(['./src/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('build/'));
});

gulp.task('build:schema', ['build:compile'], function(cb){
    var Schema = require('./build/schema').Schema;
    graphql(Schema, introspectionQuery)
        .then(
            function(result){
                fs.writeFile(
                    path.join(__dirname, './data/schema.json'),
                    JSON.stringify(result, null, 2),
                    cb
                );
            },
            cb
        );
});

gulp.task('clean', function(){
    return del([
        'build'
    ]);
});