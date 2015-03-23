var gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	jshint = require('gulp-jshint'),
	runSequence = require('run-sequence'),
	mergeStream = require('merge-stream'),
	watch = require('gulp-watch'),
	jshintFailReporter = require('./tasks/jshintFailReporter'),
	ractiveParse = require('./tasks/ractiveParse.js'),
	ractiveConcatComponents = require('./tasks/ractiveConcatComponents.js'),
	gulpWing = require('./tasks/gulpWing.js');

gulp.task('connect', function () {
	connect.server({
		root: 'public',
		livereload: true,
		port: 9080
	});
});

gulp.task('html', function () {
	return gulp.src('./public/*.html')
		.pipe(connect.reload());
});

gulp.task('copy-vendors', function () {

	return mergeStream(

		gulp.src([
			'./node_modules/ractive/ractive.min.js',
			'./node_modules/ractive/ractive.min.js.map',
			'./node_modules/jquery/dist/jquery.min.js',
			'./node_modules/jquery/dist/jquery.min.map',
			'./node_modules/lodash/lodash.min.js'
		])
		.pipe(gulp.dest('./public/js')),

		gulp.src([
			'node_modules/zurb-foundation-5/doc/assets/img/images/**/*'
		])
		.pipe(gulp.dest('public/images/'))

	);

});

gulp.task('clean', ['jshint'], function (callback) {
	del([
		'public/**/*',
		// We want to keep index.html
		'!public/index.html'
	], callback);
});

gulp.task('build-sass', function () {

	return mergeStream(

		gulp.src('./src/**/*.scss')
			.pipe(sass())
			.pipe(concat('components.css'))
			.pipe(gulp.dest('./public/css')),

		gulp.src('./node_modules/zurb-foundation-5/scss/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('./public/css/foundation'))

	);

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

gulp.task('build', ['jshint', 'clean'], function (callback) {
	runSequence([
		'build-sass',
		'ractive-build-templates',
		'ractive-build-components'
	], [
		'copy-vendors',
		'concat-app'
	], callback);
});

gulp.task('watch', function () {
	var self = this;
	watch([
		'public/*.html',
		'src/**/*.hbs',
		'src/**/*.js',
		'src/**/*.scss'
	], function () {
		runSequence('build', 'html', function (err) {
			self.emit('end');
		});
	});

});

gulp.task('jshint', function (callback) {
	return gulp.src('./src/**/*.js')
		.pipe(jshint('./.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshintFailReporter());
});

gulp.task('default', function () {
	var self = this;
	runSequence('jshint', 'build', 'connect', 'watch', function (err) {
		self.emit('end');
	});


});
