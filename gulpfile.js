var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	runSequence = require('run-sequence'),
	watch = require('gulp-watch'),
	header = require('gulp-header'),
	footer = require('gulp-footer'),
	ractiveParse = require('./tasks/ractiveParse.js'),
	ractiveConcatComponents = require('./tasks/ractiveConcatComponents.js'),
	renderDocumentation = require('./tasks/renderDocumentation.js'),
	fs = require('fs'),
	gulpWing = require('./tasks/gulpWing.js');

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		livereload: true,
		port: 9080
	});
});

gulp.task('html', function () {
	gulp.src('./public/*.html')
		.pipe(connect.reload());
});

gulp.task('copy-vendors', function () {
	gulp.src([
		'./node_modules/ractive/ractive.js',
		'./node_modules/jquery/dist/jquery.min.js',
		'./node_modules/lodash/lodash.min.js'
	])
		.pipe(gulp.dest('./public/js'));
});


gulp.task('build-sass', function () {
	gulp.src('./src/**/*.scss')
		.pipe(sass())
		.pipe(concat('components.css'))
		.pipe(gulp.dest('./public/css'));

	gulp.src('./node_modules/zurb-foundation-5/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/css/foundation'));
});

gulp.task('ractive-build-templates', function () {
	return gulp.src('./src/components/**/*.hbs')
		.pipe(ractiveParse({
			'prefix': 'RactiveF'
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('ractive-build-components', function () {
	return gulp.src('./src/components/**/*.js')
		.pipe(ractiveConcatComponents({
			'prefix': 'RactiveF'
		}))
		.pipe(concat('components.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('build-documentation', function () {
	return gulp.src('./src/components/**/*.md')
		.pipe(renderDocumentation())
		.pipe(concat('documentation.html'))
		.pipe(header(fs.readFileSync('tasks/documentation/header.html')))
		.pipe(footer(fs.readFileSync('tasks/documentation/footer.html')))
		.pipe(gulp.dest('./public/'));
});

gulp.task('concat-app', function () {
	return gulp.src([
		'./src/app.js',
		'./public/js/templates.js',
		'./public/js/components.js'])
		.pipe(concat('ractivef.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('wing', function (callback) {
	gulpWing();
	callback();
});

gulp.task('build', function (callback) {
	runSequence([
		'build-sass',
		'ractive-build-templates',
		'ractive-build-components',
		'build-documentation'
	], [
		'copy-vendors',
		'concat-app'
	], callback);
});

gulp.task('watch', function () {

	watch([
		'public/index.html',
		'src/**/*.hbs',
		'src/**/*.md',
		'src/**/*.js',
		'src/**/*.scss'
	], function () {
		runSequence('build', 'html');
	});

});

gulp.task('default', function (callback) {
	runSequence('build', 'connect', 'watch', callback);
});
