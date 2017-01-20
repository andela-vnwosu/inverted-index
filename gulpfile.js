const gulp = require('gulp');
const browserSync = require ('browser-sync').create();

gulp.task('browserSync', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: './',
        },
        port: 3000,
        ghostMode: false
    });
});



gulp.task('default', ['browserSync']);

gulp.task('watch', function() {
//gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('index.css', browserSync.reload);
    gulp.watch('index.html', browserSync.reload);
    gulp.watch('./src/*.js', browserSync.reload);
//   gulp.watch(['./src/*.js', './jasmine/spec/*.js'], browserSync.reload);
});