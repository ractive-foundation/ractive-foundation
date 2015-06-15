var gulp = require('gulp'),
	del = require('del'),
	runSequence = require('run-sequence'),
	mergeStream = require('merge-stream'),
	fs = require('fs'),
	nodePath = require('path'),

	plugins = require('gulp-load-plugins')(),

	applyVersions = require('./tasks/applyVersions'),
	rebaseDist = require('./tasks/rebaseDist'),
	rfCucumber = require('./tasks/rfCucumber'),
	ractiveParse = require('./tasks/ractiveParse'),
	ractiveConcatComponents = require('./tasks/ractiveConcatComponents'),
	renderDocumentation = require('./tasks/renderDocumentation'),
	concatManifests = require('./tasks/concatManifests'),
	gulpWing = require('./tasks/gulpWing'),
	jshintFailReporter = require('./tasks/jshintFailReporter');

var pkg = require('./package.json');

gulp.task('connect', function () {
	plugins.connect.server({
		root: 'public',
		livereload: true,
		port: 9080
	});
});

gulp.task('html', function () {
	return gulp.src('./public/*.html')
		.pipe(plugins.connect.reload());
});

gulp.task('copy-vendors', function () {

	return mergeStream(

		gulp.src([
			'./node_modules/ractive/ractive.js',
			'./node_modules/ractive/ractive.min.js',
			'./node_modules/ractive/ractive.min.js.map',
			'./node_modules/hammerjs/hammer.min.js',
			'./node_modules/ractive-touch/index.js',
			'./node_modules/jquery/dist/jquery.min.js',
			'./node_modules/jquery/dist/jquery.min.map',
			'./node_modules/lodash/lodash.min.js',
			'./node_modules/superagent/superagent.js',
			'./node_modules/page/page.js',
			'./node_modules/foundation-sites/js/vendor/modernizr.js',
			'./node_modules/lodash-compat/index.js'
		])
		.pipe(plugins.copy('./public/js', { prefix: 1 })),

		// Our own project files.
		gulp.src('./src/route.js')
		.pipe(gulp.dest('./public/js')),

		// Some reference images, taken from Zurb for demo'ing, but not part of the real source.
		gulp.src([
			'./src/assets/images/**/*'
		])
		.pipe(gulp.dest('public/images/'))

	);

});

gulp.task('copy-use-cases', function () {
	return gulp.src([
		'./src/components/**/use-cases/*.json'
	])
		.pipe(plugins.rename(function (path) {
			// Get rid of the extra "use-cases" folder for the destination.
			path.dirname = path.dirname.split(nodePath.sep)[0];
		}))
		.pipe(gulp.dest('public/use-cases/'));
});

gulp.task('clean', function (callback) {
	del([
		'public/**/*'
	], callback);
});

gulp.task('build-sass', function () {

	return mergeStream(

		gulp.src('./src/**/*.scss')
			.pipe(plugins.sass())
			.pipe(plugins.concat('components.css'))
			.pipe(gulp.dest('./public/css')),

		gulp.src('./node_modules/foundation-sites/scss/*.scss')
			.pipe(plugins.sass())
			.pipe(gulp.dest('./public/css/foundation'))

	);

});

gulp.task('ractive-build-templates', function () {
	return gulp.src('./src/components/**/*.hbs')
		.pipe(ractiveParse({
			'prefix': 'RactiveF.templates'
		}))
		.pipe(plugins.concat('templates.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('ractive-build-components', function () {
	return gulp.src([
			'./src/components/**/*.js',
			'!./src/components/**/*.steps.js'
		])
		.pipe(ractiveConcatComponents({
			'prefix': 'RactiveF.components'
		}))
		.pipe(plugins.concat('components.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('build-documentation', function () {

	var headerHtml = fs.readFileSync('./src/header.html');
	var footerHtml = fs.readFileSync('./src/footer.html');

	return mergeStream(

		// Component docs page.
		gulp.src('./src/components/**/manifest.json')
		.pipe(concatManifests('manifest-rf.json'))
		.pipe(gulp.dest('./public/'))
		// Create one doc file per component, using single manifest-rf.json file data.
		.pipe(renderDocumentation({
			componentsDir: './src/components/',
			docSrcPath: './src/component-page.html',
			indexSrcPath: './src/components.html'
		}))
		.pipe(plugins.header(headerHtml, { pkg: pkg }))
		.pipe(plugins.footer(footerHtml))
		.pipe(gulp.dest('./public/')),

		// Documentation pages.
		gulp.src([ './src/pages/*.html' ])
		.pipe(plugins.header(headerHtml, { pkg: pkg }))
		.pipe(plugins.footer(footerHtml))
		.pipe(gulp.dest('./public/')),

		// Blank pages
		gulp.src([ './src/blank-pages/*.html' ])
			.pipe(gulp.dest('./public/')),

		// Test runner while we're at it.
		gulp.src('./src/testRunner.html')
			.pipe(gulp.dest('./public/'))

	);

});

gulp.task('concat-app', function () {
	var files = [
		'./src/ractivef.base.js',
		'./public/js/templates.js',
		'./public/js/components.js'
	];
	return gulp.src(files)
		.pipe(plugins.concat('ractivef-base.js'))
		.pipe(gulp.dest('./public/js/'))
		.pipe(plugins.footer(fs.readFileSync('./src/ractivef.initializer.js')))
		.pipe(plugins.concat('ractivef.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('concat-app-amd', function () {
	return gulp.src('./public/js/ractivef-base.js')
		.pipe(plugins.wrap({ src: './src/ractivef-amd.js'}))
		.pipe(plugins.concat('ractivef-amd.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('concat-app-commonjs', function () {
	return gulp.src('./public/js/ractivef-base.js')
		.pipe(plugins.wrap({ src: './src/ractivef-cjs.js'}))
		.pipe(plugins.concat('ractivef-cjs.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('apply-versions', function () {
	return gulp.src([
		'public/js/ractivef-amd.js',
		'public/js/ractivef-base.js',
		'public/js/ractivef-cjs.js',
		'public/js/ractivef.js'
	])
	.pipe(applyVersions());

});

gulp.task('wing', function (callback) {
	gulpWing();
	callback();
});

gulp.task('build', ['clean', 'jshint'], function (callback) {
	runSequence([
		'build-sass',
		'ractive-build-templates',
		'ractive-build-components',
		'build-documentation'
	], [
		'copy-vendors',
		'copy-use-cases',
		'concat-app'
	], [
		'concat-app-amd',
		'concat-app-commonjs'
	], [
		'apply-versions'
	], callback);
});

gulp.task('dist', ['build'], function () {

	return mergeStream(
		gulp.src([
			'./public/js/ractivef-*.js',
			'./public/manifest-rf.json',
			'./public/js/lodash-compat/*',
			'./public/js/hammerjs/hammer.min.js',
			'./public/js/ractive-touch/*'
		], { base: process.cwd() })
			.pipe(rebaseDist())

		.pipe(gulp.dest('dist')),

		gulp.src([
			'public/css/**/*.css'
		]).pipe(gulp.dest('dist/css'))
	);

});

gulp.task('watch', function () {
	var self = this;
	plugins.watch([
		'src/*.html',
		'src/pages/*.html',
		'src/blank-pages/*.html',
		'src/**.*.json',
		'src/**/*.hbs',
		'src/**/*.md',
		'src/**/*.js',
		'src/**/*.scss'
	], function () {
		runSequence('build', 'html', function (err) {
			self.emit('end');
		});
	});

});

gulp.task('test', ['build', 'connect'], function (callback) {
	return gulp
		.src('./src/components/**/*.feature')
		.pipe(rfCucumber(
			{ steps: './src/components/**/*.steps.js' }
		)).on('end', function (err) {
			if (!err) {
				callback();
				return process.exit(0);
			}
		});
});

gulp.task('jshint', function (callback) {
	return gulp.src('./src/**/*.js')
		.pipe(plugins.jshint('./.jshintrc'))
		.pipe(plugins.jshint.reporter('jshint-stylish'))
		.pipe(jshintFailReporter());
});

gulp.task('selenium-standalone-install', function () {
	return plugins.run('./node_modules/selenium-standalone/bin/selenium-standalone install')
		.exec();
});

gulp.task('default', function () {
	var self = this;
	runSequence('jshint', 'build',  'connect', 'watch', function (err) {
		self.emit('end');
	});
});
