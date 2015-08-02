var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('default', function() {
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
