var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    ractiveParse = require('./tasks/ractiveParse.js'),
    ractiveConcatComponents = require('./tasks/ractiveConcatComponents.js');

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./public/*.html')
        .pipe(connect.reload());
});

gulp.task('copy-ractive', function () {
    gulp.src('./node_modules/ractive/ractive.js')
        .pipe(gulp.dest('./public/js'));
});


gulp.task('build-sass', function () {
    gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(concat('components.css'))
        .pipe(gulp.dest('./public/css'));

    gulp.src('./node_modules/foundation/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css/foundation'));
});

gulp.task('ractive-build-templates', function() {
    return gulp.src('./src/components/**/*.hbs')
        .pipe(ractiveParse())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('ractive-build-components', function() {
    return gulp.src('./src/components/**/*.js')
        .pipe(ractiveConcatComponents())
        .pipe(concat('components.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('build', [
    'build-sass',
    'ractive-build-templates',
    'ractive-build-components',
    'copy-ractive'
]);

gulp.task('watch', function () {
    gulp.watch(
        [
            './public/*.html',
            './src/**/*.js',
            './src/**/*.hbs',
            './src/**/*.sass'
        ],
        [
            'build',
            'html'
        ]
    );
});

gulp.task('default', ['build', 'connect', 'watch']);