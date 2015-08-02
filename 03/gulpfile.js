var gulp = require('gulp');
var eslint = require('gulp-eslint');
var useref = require('gulp-useref');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

gulp.task('default', function() {
});

gulp.task('fonts', function() {
    return gulp.src('./font/*')
        .pipe(gulp.dest('dist/font'));
});

gulp.task('production', function() {
    var assetsStream = useref.assets();

    return gulp.src('index.html')
        .pipe(assetsStream)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minify()))
        .pipe(rev())       
        .pipe(assetsStream.restore())
        .pipe(useref())
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  return gulp.src(['./js/*.js', '!./js/jquery*', '!./js/material*'])
    .pipe(eslint({
        env: {
            browser: true,
            jquery: true
        },
        rules: {
            quotes: [2, 'single']
        }
    }))
    .pipe(eslint.format());
});
