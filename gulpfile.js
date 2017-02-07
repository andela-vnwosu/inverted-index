const gulp = require('gulp');
const browserSync = require ('browser-sync').create();
const browserify = require('gulp-browserify');
const source = require('vinyl-source-stream');
const browserTest = require ("browser-sync").create();
const rename = require("gulp-rename");

gulp.task('browserSync',() => {
  browserSync.init({
    server: {
      baseDir: './public',
    },
    port: process.env.PORT || 4000,
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
    port: 9000,
  });
});


gulp.task('default', ['browserSync','browserTest', 'watch', 'build']);

gulp.task('watch', () => {
  gulp.watch(['public/css/index.css', 'public/index.html', 'public/src/*.js'], browserSync.reload);
  gulp.watch(['public/src/inverted-index.js', 'jasmine/spec/inverted-index-test.js', 
  'jasmine/spec/tests/test-spec.js'], ['build']);
  gulp.watch(["public/src/inverted-index.js", 'jasmine/spec/tests/test-spec.js'], browserTest.reload);
});

gulp.task('build', function() {
  gulp.src('jasmine/spec/inverted-index-test.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
        .pipe(rename('test-spec.js'))
        .pipe(gulp.dest('jasmine/spec/tests/'))
});