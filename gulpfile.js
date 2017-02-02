const gulp = require('gulp');
const browserSync = require ('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const browserTest = require ("browser-sync").create();

gulp.task('browserSync', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: './public',
        },
        port: process.env.PORT || 3000,
      ui: false,
        ghostMode: false
    });
});

gulp.task('browserTest', () => {
  browserTest.init({
    server: {
      baseDir: ['./public/src', './jasmine'],
      index: 'SpecRunner.html'
    },
    port: 8888,
    ui: false,
    ghostMode: false
  });
});


gulp.task('default', ['browserSync', 'browserTest', 'watch']);

gulp.task('watch', function() {

  gulp.watch('public/css/index.css', browserSync.reload);
  gulp.watch('public/index.html', browserSync.reload);
  gulp.watch('jasmine/spec/tests/test-spec.js', browserSync.reload);
  gulp.watch('./src/*.js', browserSync.reload);
});

gulp.task('browserify', () =>
  browserify('jasmine/spec/inverted-index-test.js')
    .bundle()
    .pipe(source('test-spec.js'))
    .pipe(gulp.dest('./jasmine/spec/tests'))
);