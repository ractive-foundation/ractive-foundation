var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect');

gulp.task('sass', function () {
    gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(
        ['./app/*.html', './src/**/*.js'],
        ['html']
    );
});

gulp.task('default', ['connect', 'watch']);