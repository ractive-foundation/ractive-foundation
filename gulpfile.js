var gulp = require('gulp'),
	del = require('del'),
	glob = require('simple-glob'),
	exec = require('child_process').exec,
	gutil = require('gulp-util'),
	jscs = require('gulp-jscs'),
	runSequence = require('run-sequence'),
	mergeStream = require('merge-stream'),
	fs = require('fs'),
	nodePath = require('path'),
	path = require('path'),

	cordovaCreate = require('gulp-cordova-create'),
	cordovaDescription = require('gulp-cordova-description'),
	cordovaAuthor = require('gulp-cordova-author'),
	cordovaVersion = require('gulp-cordova-version'),
	cordovaAndroid = require('gulp-cordova-build-android'),
	cordovaIos = require('gulp-cordova-build-ios'),

	plugins = require('gulp-load-plugins')(),
	grf = require('gulp-ractive-foundation')(),

	applyVersions = require('./tasks/applyVersions'),
	rebaseDist = require('./tasks/rebaseDist'),
	seleniumServer = require('./tasks/seleniumServer'),
	rfCucumber = require('./tasks/rfCucumber'),
	ractiveParse = require('./tasks/ractiveParse'),
	renderDocumentation = require('./tasks/renderDocumentation'),
	concatManifests = require('./tasks/concatManifests'),
	gulpWing = require('./tasks/gulpWing'),
	jshintFailReporter = require('./tasks/jshintFailReporter'),
	rfA11y = require('./tasks/rfA11y'),

	pkg = require('./package.json');

var lowerCaseOnly = new RegExp('^[a-z-]+$', 'g');
var args = require('node-getopt-long').options([
	['name|n=s', {
		description: 'The name of the component to create',
		paramName: 'ux-...',
		test: function (value) {
			// Check for ux-*, including nothing at all to error out on.
			if (value.length < 4) {
				throw new gutil.PluginError('gulp-wing', 'wing needs --name param to work');
			}

			// Names of components MUST be lowercase, and start with 'ux-'.
			if (!lowerCaseOnly.test(value) || 'ux-' !== value.substr(0, 3)) {
				throw new gutil.PluginError('gulp-wing', 'Component name must be all lowercase alphanumeric, ' +
					'and begin with "ux-". Example: ux-' + value.toLowerCase());
			}

			return value;
		}
	}],
	['component|c=s', 'Specify a component to run tests for'],
	['plugin|p=s', 'Specify a plugin to run tests for'],
	['android|a', 'Build android cordover components'],
	['ios|i', 'Build iOS cordover components'],
], {
	name: 'gulp (task) [option]',
	helpSuffix: '  Gulp tasks:\n' +
		'    a11y            Run a11y tests\n' +
		'    a11y-connect    Connect to a11y server\n' +
		'    a11y-only       \n' +
		'    build           Build components, plugins and documentation\n' +
		'    build-documentation-components\n' +
		'                    Build component documentation\n' +
		'    build-documentation-plugins\n' +
		'                    Build plugin documentation\n' +
		'    build-sass      Compile SASS to CSS\n' +
		'    clean           Clean the public directory\n' +
		'    clean-dist      Clean the dist directory\n' +
		'    concat-app      ??\n' +
		'    concat-app-umd  ??\n' +
		'    connect         ??\n' +
		'    copy-use-cases  ??\n' +
		'    copy-vendors    Copy vendor files\n' +
		'    cordova-build   Run a cordover build\n' +
		'    cordova-clean   Clean cordover build files\n' +
		'    cordova-create  Create a new cordover build\n' +
		'    cordova-run     Run RF as a cordover app\n' +
		'    dist            Build dist files\n' +
		'    html            Generate html\n' +
		'    lint            Run lint task on files\n' +
		'    ractive-build-components\n' +
		'                    Build components\n' +
		'    ractive-build-plugins\n' +
		'                    Build plugins\n' +
		'    ractive-build-templates\n' +
		'                    Build templates\n' +
		'    ractive-build-test-templates\n' +
		'                    Build test templates\n' +
		'    test            Run tests\n' +
		'    test-connect    ??\n' +
		'    test-only       ??\n' +
		'    version-check   Check minimum node version\n' +
		'    watch           Run watch task\n' +
		'    wing            Create a new component or plugin\n'
});

const DEV_SERVER_PORT = 9080,
	TEST_SERVER_PORT = 8088,
	A11Y_SERVER_PORT = 8089;

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

gulp.task('a11y-connect', function (callback) {
	plugins.connect.server({
		root: 'public',
		port: A11Y_SERVER_PORT
	});
	callback();
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
			'./node_modules/ractive-events-tap/dist/ractive-events-tap.umd.js',
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
		'./src/components/**/use-cases/*.json',
		'./src/plugins/**/use-cases/*.json',
	])
		.pipe(plugins.rename(function (path) {
			// Get rid of the extra "use-cases" folder for the destination.
			path.dirname = path.dirname.split(nodePath.sep)[0];
		}))
		.pipe(gulp.dest('public/use-cases/'));
});

gulp.task('clean', function (callback) {
	return del([
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
	return gulp.src([
			'./src/components/**/*.hbs',
			'!./src/components/**/use-cases/*.hbs',
			'!./src/plugins/**/use-cases/*.hbs'
		])
		.pipe(ractiveParse({
			template: true,
			prefix: 'Ractive.defaults.templates'
		}))
		.pipe(plugins.concat('templates.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('ractive-build-test-templates', function () {
	return gulp.src([
			'./src/components/**/use-cases/*.hbs',
			'./src/plugins/**/use-cases/*.hbs'
		])
		.pipe(ractiveParse({
			objectName: function(file) {
				var parts = file.history[0].split(path.sep).slice(-3);
				return parts[0] + '-' + parts[2].replace(/[.]hbs$/, '');
			},
			template: true,
			prefix: 'Ractive.defaults.templates'
		}))
		.pipe(plugins.concat('templates-tests.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('ractive-build-components', function () {
	return gulp.src([
			'src/components/**/*',
		])
		.pipe(grf.filter(/src\/components\/([^\/]+)/))
		.pipe(grf.component())
		.pipe(gulp.dest('public/components/'))
		.pipe(plugins.concat('components.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('ractive-build-plugins', function () {
	return gulp.src([
			'./src/plugins/**/*.js',
			'!./src/plugins/**/*.steps.js'
		])
		.pipe(ractiveParse({
			'prefix': 'Ractive'
		}))
		.pipe(plugins.concat('plugins.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('build-documentation-components', function () {

	var headerHtml = fs.readFileSync('./src/header.html'),
		footerHtml = fs.readFileSync('./src/footer.html');

	return mergeStream(

		// Component docs page.
		gulp.src('./src/components/**/manifest.json')
		.pipe(concatManifests('manifest-rf.json'))
		.pipe(gulp.dest('./public/'))
		// Create one doc file per component, using single manifest-rf.json file data.
		.pipe(renderDocumentation({
			type: 'components',
			componentsDir: './src/components/',
			docSrcPath: './src/component-page.html',
			indexSrcPath: './src/components.html',
			partials: [
				'./src/component.html',
				'./src/component-use-case.html'
			]
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

gulp.task('build-documentation-plugins', function () {

	var headerHtml = fs.readFileSync('./src/header.html'),
		footerHtml = fs.readFileSync('./src/footer.html');

	return mergeStream(

		// Plugins docs page.
		gulp.src('./src/plugins/**/manifest.json')
		.pipe(concatManifests('manifest-rf.json'))
		.pipe(gulp.dest('./public/'))
		// Create one doc file per plugin, using single manifest-rf.json file data.
		.pipe(renderDocumentation({
			type: 'plugins',
			componentsDir: './src/plugins/',
			docSrcPath: './src/plugin-page.html',
			indexSrcPath: './src/plugins.html',
			partials: [
				'./src/plugin.html',
				'./src/plugin-use-case.html'
			]
		}))
		.pipe(plugins.header(headerHtml, { pkg: pkg }))
		.pipe(plugins.footer(footerHtml))
		.pipe(gulp.dest('./public/'))

	);

});
gulp.task('concat-app', function () {
	var files = [
		'./src/ractivef.base.js',
		'./public/js/templates.js',
		'./public/js/plugins.js',
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
	gulpWing(args);
	callback();
});

gulp.task('build', ['clean', 'lint'], function (callback) {
	runSequence([
		'build-sass',
		'ractive-build-templates',
		'ractive-build-test-templates',
		'ractive-build-plugins',
		'ractive-build-components',
		'build-documentation-plugins',
		'build-documentation-components'
	], [
		'copy-vendors',
		'copy-use-cases',
		'concat-app'
	], [
		'concat-app-umd'
	], callback);
});


gulp.task('clean-dist', function (callback) {
	return del([
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
	exec('node ./scripts/versionCheck.js', function (err, stdout) {
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
		'src/**/*.json',
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

gulp.task('a11y-only', [ 'a11y-connect' ], function (callback) {

	rfA11y.auditComponents({ port: A11Y_SERVER_PORT }, args)
		.then(function () {
			callback();
			process.exit(0);
		})
		.catch(function (error) {
			callback(new Error(error));
			process.exit(1);
		});

});

// Run the test suite alone, without re-building the project. Useful for rapid test debugging.
// See 'test' for the full build and test task.
gulp.task('test-only', [ 'test-connect' ], function (callback) {

	var selServer = seleniumServer(),
		globFeature = [],
		globStep = [],
		componentName  = args.component || '',
		paths = [];

	if (args.component) {

		paths = [
			'./src/components/%s/*.feature'.replace('%s', componentName)
		];

		globFeature = glob(paths);

		if (!globFeature.length) {
			gutil.log(gutil.colors.red.bold('Couldn\'t find requested component/widget, running whole suite'));
		}
	}
	if (args.plugin) {

		var pluginName = args.plugin || '';

		var paths = [
			'./src/plugins/%s/*.feature'.replace('%s', pluginName)
		];

		globFeature = glob(paths);

		if (!globFeature.length) {
			gutil.log(gutil.colors.red.bold('Couldn\'t find requested component/widget, running whole suite'));
		}
	}

	if (!globFeature.length) {

		paths = [
			'./src/components/**/*.feature',
			'./src/plugins/**/*.feature'
		];

		globFeature = glob(paths);
	}

	globStep = [
		'./src/components/**/*.steps.js',
		'./src/plugins/**/*.steps.js'
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

gulp.task('cordova-clean', function (callback) {
	return del([
		'.cordova/**/*'
	], callback);
});

gulp.task('cordova-create', ['cordova-clean'], function () {
	var options = {
		dir: '.cordova',
		id: 'com.ractiveFoundationDemo.sample',
		name: 'Ractive Foundation Demo'
	};

	return gulp.src('public')
		.pipe(cordovaCreate(options))
		.pipe(cordovaAuthor('Ractive Foundation Team', ''))
		.pipe(cordovaDescription('Ractive Foundation Demo'))
		.pipe(cordovaVersion(pkg.version));
});

gulp.task('cordova-build', ['cordova-create'], function (callback) {
	if (args.ios) {
		return gulp.src('.cordova')
			.pipe(cordovaIos(true));
	} else if (args.android) {
		return gulp.src('.cordova')
			.pipe(cordovaAndroid(true))
			.pipe(gulp.dest('apk'));
	} else {
		return gulp.src('.cordova')
			.pipe(cordovaIos(true))
			.pipe(cordovaAndroid(true))
			.pipe(gulp.dest('apk'));
	}
});

gulp.task('cordova-run', function (callback) {
	var platform = args.ios ? 'ios' : 'android';

	exec('(cd ./.cordova/ && cordova run ' + platform + ')', function (err, stdout) {
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

// Build and test the project. Default choice. Used by npm test.
gulp.task('test', function (callback) {
	runSequence([ 'version-check', 'build' ], 'test-only', callback);
});

// Currently a11y not part of standard build/test process.
gulp.task('a11y', function (callback) {
	runSequence([ 'version-check', 'build' ], 'a11y-only', callback);
});

gulp.task('lint', function (callback) {
	return gulp.src('./src/**/*.js')
		.pipe(plugins.jshint('./.jshintrc'))
		.pipe(plugins.jshint.reporter('jshint-stylish'))
		.pipe(jscs())
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'))
		.pipe(jshintFailReporter());
});

gulp.task('default', function () {
	var self = this;
	runSequence('version-check', 'lint', 'build',  'connect', 'watch', function (err) {
		self.emit('end');
	});
});
