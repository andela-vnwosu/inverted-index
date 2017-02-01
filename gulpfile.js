const gulp = require('gulp');
const browserSync = require ('browser-sync').create();

gulp.task('browserSync', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: './',
        },
        port: process.env.PORT || 3000,
        ghostMode: false
    });
});



gulp.task('default', ['browserSync', 'watch']);

gulp.task('watch', function() {

  gulp.watch('index.css', browserSync.reload);
  gulp.watch('index.html', browserSync.reload);
  gulp.watch('jasmine/spec/inverted-index-test.js', browserSync.reload);
  gulp.watch('./src/*.js', browserSync.reload);
});