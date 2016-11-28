var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    gulp.start('compile-typescript');
    gulp.start('compile-less');
    gulp.start('watch');
});

gulp.task('compile-typescript', function () {
    return gulp.src(['typings/index.d.ts', 'const/*.ts', 'app/**/*.ts', 'extensions/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts({
            target: 'ES5',
            out: 'mapp.qt.js'
        }))
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/MApp.QuadTree/'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('compile-less', function () {
    return gulp.src('styles/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/MApp.QuadTree/styles/'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.ts', ['compile-typescript']);
  gulp.watch('styles/*.less', ['compile-less']);
});