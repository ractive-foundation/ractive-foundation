var gulp = require('gulp'),
	args = require('yargs').argv,
	del = require('del'),
	glob = require('simple-glob'),
	exec = require('child_process').exec,
	gutil = require('gulp-util'),
	runSequence = require('run-sequence'),
	mergeStream = require('merge-stream'),
	fs = require('fs'),
	nodePath = require('path'),
	_ = require('lodash-compat'),
	a11y = require('a11y'),
	Q = require('q'),

	plugins = require('gulp-load-plugins')(),

	applyVersions = require('./tasks/applyVersions'),
	rebaseDist = require('./tasks/rebaseDist'),
	seleniumServer = require('./tasks/seleniumServer'),
	rfCucumber = require('./tasks/rfCucumber'),
	ractiveParse = require('./tasks/ractiveParse'),
	ractiveConcatComponents = require('./tasks/ractiveConcatComponents'),
	renderDocumentation = require('./tasks/renderDocumentation'),
	concatManifests = require('./tasks/concatManifests'),
	gulpWing = require('./tasks/gulpWing'),
	jshintFailReporter = require('./tasks/jshintFailReporter');

var pkg = require('./package.json');

const DEV_SERVER_PORT = 9080;
const TEST_SERVER_PORT = 8088;

gulp.task('connect', function () {
	plugins.connect.server({
		root: 'public',
		livereload: true,
		port: DEV_SERVER_PORT
	});
});

gulp.task('test-connect', function () {
	plugins.connect.server({
		root: 'public',
		port: TEST_SERVER_PORT
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
			'./node_modules/ractive-events-tap/dist/ractive-events-tap.js',
			'./node_modules/ractive-events-hover/src/Ractive-hover.js',
			'./node_modules/jquery/dist/jquery.min.js',
			'./node_modules/jquery/dist/jquery.min.map',
			'./node_modules/lodash/lodash.min.js',
			'./node_modules/superagent/superagent.js',
			'./node_modules/page/page.js',
			'./node_modules/foundation-sites/js/vendor/modernizr.js',
			'./node_modules/lodash-compat/index.js',
			'./node_modules/hljs-cdn-release/build/highlight.min.js'
		])
		.pipe(plugins.copy('./public/js', { prefix: 1 })),

		gulp.src([
			'./node_modules/hljs-cdn-release/build/styles/github.min.css'
		])
		.pipe(plugins.copy('./public/css', { prefix: 1 })),

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
			'prefix': 'Ractive.defaults.templates'
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
			'prefix': 'Ractive.components'
		}))
		.pipe(plugins.concat('components.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('ractive-build-decorators', function () {
	return gulp.src([
			'./src/decorators/**/*.js',
			'!./src/decorators/**/*.steps.js'
		])
		.pipe(ractiveConcatComponents({
			'prefix': 'Ractive.decorators'
		}))
		.pipe(plugins.concat('decorators.js'))
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
		'./public/js/decorators.js',
		'./public/js/components.js'
	];
	return gulp.src(files)
		.pipe(plugins.concat('ractivef-base.js'))
		.pipe(gulp.dest('./public/js/'))
		.pipe(plugins.footer(fs.readFileSync('./src/ractivef.initializer.js')))
		.pipe(plugins.concat('ractivef.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('concat-app-umd', function () {
	return gulp.src('./public/js/ractivef-base.js')
		.pipe(plugins.wrap({ src: './src/ractivef-umd.js'}))
		.pipe(plugins.concat('ractivef-umd.js'))
		.pipe(gulp.dest('./public/js/'))
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
		'ractive-build-decorators',
		'ractive-build-components',
		'build-documentation'
	], [
		'copy-vendors',
		'copy-use-cases',
		'concat-app'
	], [
		'concat-app-umd'
	], callback);
});


gulp.task('clean-dist', function (callback) {
	del([
		'dist/**/*'
	], callback);
});

gulp.task('dist', ['clean-dist', 'build'], function () {

	return mergeStream(

		gulp.src([
			'./public/js/ractivef-umd.js'
			])
		.pipe(plugins.rename(function (path) {
			// Rename the dist file to 'ractivef'
			path.dirname = '';
			path.basename = 'ractivef';
		}))
		.pipe(gulp.dest('dist')),

		gulp.src([
			'./public/manifest-rf.json',
			'./public/js/lodash-compat/*',
			'./public/js/hammerjs/hammer.min.js',
			'./public/js/ractive-touch/*',
			'./public/js/ractive-events-tap/dist/*'
		], { base: process.cwd() })
			.pipe(rebaseDist())

		.pipe(gulp.dest('dist')),

		gulp.src([
			'public/css/**/*.css'
		]).pipe(gulp.dest('dist/css'))
	);

});

gulp.task('version-check', function (callback) {
	exec('node ./bin/versionCheck.js', function(err, stdout) {
		if (stdout) {
			gutil.log(gutil.colors.red(stdout));
		}

		if (err) {
			gutil.log(gutil.colors.red('Exiting...'));
			process.exit(1);
		}

		callback(err);
	});
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

gulp.task('a11y', function (callback) {

	// Create test harness URLs from all use cases in the repo.
	var urls = _(glob('./src/components/ux-alert/use-cases/*.json'))
		.map(function (useCase) {
			var parsed = nodePath.parse(useCase);
			var arr = parsed.dir.split(nodePath.sep);
			return [
				'http://localhost:' + TEST_SERVER_PORT + '/testRunner.html#!/component',
				arr[3],
				'use-case',
				parsed.name
			].join('/');
		})
		.value();

	var promises = _.map(urls, function (url) {

		gutil.log(gutil.colors.green('Running a11y on ' + url));

		return Q.Promise(function (resolve, reject) {
			a11y(url, function (err, reports) {

				if (err) {
					reject(err);
				}

				// var failures = _.where(reports.audit, { result: 'FAIL' });
				// if (failures) {
				// 	gutil.log(gutil.colors.red('a11y failed, report:\n ' + reports.report));
				// 	reject('a11y FAILed on url: ' + url);
				// }

				if (reports.report) {
					gutil.log(gutil.colors.red('a11y failed for url: ' +  url + '\n' + reports.report));
					reject('a11y FAIL on one or more urls, see log');
				}

				resolve('a11y PASS ' + url);

			});
		});

	});

	// Only pass gulp task if ALL tests pass.
	return Q.all(promises);

});

// Run the test suite alone, without re-building the project. Useful for rapid test debugging.
// See 'test' for the full build and test task.
gulp.task('test-only', [ 'test-connect' ], function (callback) {

	var selServer = seleniumServer();

	var globFeature = [];

	if (args.component) {

		var componentName = args.component || '';

		var paths = [
			'./src/components/%s/*.feature'.replace('%s', componentName)
		];

		globFeature = glob(paths);

		if (!globFeature.length) {
			gutil.log(gutil.colors.red.bold('Couldn\'t find requested component/widget, running whole suite'));
		}
	}

	if (!globFeature.length) {

		var paths = [
			'./src/components/**/*.feature'
		];

		globFeature = glob(paths);
	}

	var globStep = [
		'./src/components/**/*.steps.js'
	];

	selServer.init().then(function () {
		var stream = gulp.src(globFeature)
			.pipe(rfCucumber(
				{ steps: globStep }
			));

		stream.on('end', function () {
			selServer.killServer().then(function () {
				callback();
				process.exit(0);
			}).catch(function () {
				callback();
				process.exit(0);
			});
		});

		stream.on('error', function (err) {
			var errorCode = err ? 1 : 0;
			selServer.killServer().then(function () {
				callback(err);
				process.exit(errorCode);
			}).catch(function () {
				callback(err);
				process.exit(errorCode);
			});
		});
	}).catch(gutil.log);

});

// Build and test the project. Default choice. Used by npm test.
gulp.task('test', function (callback) {
	runSequence([ 'version-check', 'build' ], 'test-only', 'a11y', callback);
});

gulp.task('jshint', function (callback) {
	return gulp.src('./src/**/*.js')
		.pipe(plugins.jshint('./.jshintrc'))
		.pipe(plugins.jshint.reporter('jshint-stylish'))
		.pipe(jshintFailReporter());
});

gulp.task('default', function () {
	var self = this;
	runSequence('version-check', 'jshint', 'build',  'connect', 'watch', function (err) {
		self.emit('end');
	});
});
