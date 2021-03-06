var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var connect = require('gulp-connect');

/*
Web server to test app
*/
gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        root: ['.', 'dist']
    });
});
/*
Automatic Live Reload
*/
gulp.task('livereload', function() {
    gulp.src(['dist/styles/*.css', 'dist/js/*.js'])
    .pipe(watch(['dist/styles/*.css', 'dist/js/*.js']))
    .pipe(connect.reload());
});
/*
copy all html files and assets
*/
gulp.task('copy', function() {
    gulp.src('src/**/*.html').pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*').pipe(gulp.dest('dist/assets'));
    gulp.src('src/lib/**/*.*').pipe(gulp.dest('dist/lib'));
    gulp.src('src/site.webmanifest').pipe(gulp.dest('dist'));
    gulp.src('src/browserconfig.xml').pipe(gulp.dest('dist'));
    gulp.src('src/favicon.ico').pipe(gulp.dest('dist'));
});
/*
compile less files
*/
gulp.task('less', function() {
    gulp.src('src/styles/main.less')
    .pipe(less())
    .pipe(gulp.dest('dist/styles'));
});
/*
copy all js files
*/
gulp.task('scripts', function() {
    gulp.src('src/scripts/**/*.*').pipe(gulp.dest('dist/scripts'));
});

/*
Watch typescript and less
*/
gulp.task('watch', function() {
    gulp.watch('src/styles/*.less', ['less']);
    gulp.watch('src/scripts/*.js', ['scripts']);
    gulp.watch('src/**/*.html', ['copy']);
})
/*
default task
*/
gulp.task('default',['less', 'scripts', 'copy', 'webserver', 'livereload', 'watch']);