const gulp = require('gulp');
const browserSync = require ('browser-sync').create();

gulp.task('browserSync', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: './public',
        },
        port: process.env.PORT || 3000,
        ghostMode: false
    });
});



gulp.task('default', ['browserSync', 'watch']);

gulp.task('watch', function() {

  gulp.watch('public/css/index.css', browserSync.reload);
  gulp.watch('public/index.html', browserSync.reload);
  gulp.watch('jasmine/spec/inverted-index-test.js', browserSync.reload);
  gulp.watch('./src/*.js', browserSync.reload);
});