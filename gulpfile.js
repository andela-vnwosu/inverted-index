const gulp = require('gulp');
const browserSync = require ('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const browserTest = require ("browser-sync").create();
const rename = require("gulp-rename");

gulp.task('browserSync',() => {
    browserSync.init({
        server: {
            baseDir: './public',
        },
        port: process.env.PORT || 3000,
      ui: false,
        ghostMode: false
    });
});

gulp.task('browserTest', ['build'], () => {
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


gulp.task('default', ['browserSync', 'browserTest', 'watchTest', 'watch', 'build']);

gulp.task('watch', ['browserSync'], () => {

  gulp.watch('public/css/index.css', browserSync.reload);
  gulp.watch('public/index.html', browserSync.reload);
  gulp.watch('public/src/*.js', browserSync.reload);
});

gulp.task('watchTest', ['browserTest'], () => {
  gulp.watch(['public/src/inverted-index.js', 'jasmine/spec/tests/test-spec.js'], ['build']);
  gulp.watch(["public/src/inverted-index.js", 'jasmine/spec/tests/test-spec.js'], browserTest.reload);
});

gulp.task('build', () => {
    gulp.src('jasmine/spec/inverted-index-test.js')
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest("jasmine/build"));
  }
);