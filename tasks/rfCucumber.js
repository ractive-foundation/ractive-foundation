var selenium = require('selenium-standalone');
var gutil = require('gulp-util');
var http = require('http');
var through = require('through2');
var Cucumber = require('cucumber');
var glob = require('simple-glob');
var async = require('async');
var Q = require('q');

/**
 * Combination of gulp-cucumber and gulp-webdriverio
 * Ensures Selenium is running and drivers are installed.
 * Kills server on completion.
 * @see https://github.com/vgamula/gulp-cucumber
 * @see https://github.com/webdriverio/gulp-webdriver
 * @param options
 * @returns {*|exports}
 */
module.exports = function (options) {

	var seleniumServer;
	var isSeleniumServerRunning;
	var seleniumOptions = options.seleniumOptions || {};
	var seleniumInstallOptions = options.seleniumInstallOptions || {};
	var argv = ['node', 'cucumber-js'];
	var format = options.format || 'pretty';
	var server;
	var files = [];
	var features = [];
	var runOptions = [];

	if (options.support) {
		files = files.concat(glob([].concat(options.support)));
	}

	if (options.steps) {
		files = files.concat(glob([].concat(options.steps)));
	}

	// Add steps and support files for CLI use.
	files.forEach(function(file) {
		runOptions.push('-r');
		runOptions.push(file);
	});

	/**
	 * Helper function to see if Selenium server is already running.
	 * @param callback
	 */
	var pingSelenium = function(callback) {

		gutil.log(gutil.colors.gray('Checking if Selenium server is running'));

		var opts = {
			host: options.host || 'localhost',
			port: options.port || 4444,
			path: '/wd/hub/status'
		};

		http.get(opts, function() {
			gutil.log(gutil.colors.green('Selenium server is running'));
			isSeleniumServerRunning = true;
			callback(null);
		}).on('error', function() {
			gutil.log(gutil.colors.gray('Selenium server is not running'));
			callback(null);
		});

	};

	/**
	 * Start the Selenium server
	 * @param callback
	 */
	var startServer = function(callback) {

		if (!server && !isSeleniumServerRunning && !options.nospawn) {

			gutil.log('Starting', gutil.colors.cyan('\'selenium standalone server\''));

			server = selenium.start(seleniumOptions, function(err, child) {
				if (err) {
					return callback(err);
				}

				gutil.log(gutil.colors.green('Selenium server successfully started'));
				seleniumServer = child;
				isSeleniumServerRunning = true;
				callback(null);
			});

		} else {
			gutil.log(gutil.colors.gray('Standalone server is running'));
			callback(null);
		}

	};

	/**
	 * Process to kill server on completion
	 */
	var killServer = function () {
		var promise;
		if (seleniumServer) {
			promise = Q.promise(function (resolve, reject) {
				seleniumServer.kill();
				seleniumServer.on('close', function (code, signal) {
					gutil.log('Finished', gutil.colors.cyan('\'selenium standalone server\''));
					return resolve(signal);
				});
				seleniumServer.on('error', function (code, signal) {
					gutil.log(gutil.colors.red('Failed to kill server!'));
					return reject(signal);
				});
			});
		} else {
			promise = Q.resolve();
			gutil.log(gutil.colors.red('Cannot kill Standalone server.'));
		}

		return promise;
	};

	/**
	 * Install webdrivers for selenium to use.
	 * @param callback
	 */
	var installDrivers = function (callback) {
		gutil.log(gutil.colors.gray('Installing driver(s) if needed'));
		selenium.install(seleniumInstallOptions, function(err) {
			if (err) {
				return callback(err);
			}

			gutil.log(gutil.colors.green('Driver installed!'));
			callback(null);
		});
	};

	// Run all cucumber tests at once.
	// TODO Run them one by one. Fail early.
	var runTests = function (callback) {
		Cucumber.Cli(argv).run(function(succeeded) {
			if (succeeded) {
				callback(null);
			} else {
				callback(new Error("Cucumber tests failed!"));
			}
		});
	};

	// Set output format
	runOptions.push('-f');
	runOptions.push(format);

	var collect = function(file, enc, callback) {
		var filename = file.path;
		if (filename.indexOf('.feature') === -1) {
			return callback();
		}
		features.push(filename);
		callback();
	};

	var run = function(callback) {

		var stream = this;

		argv.push.apply(argv, runOptions);
		argv.push.apply(argv, features);

		// Order of events.
		async.waterfall([
			pingSelenium.bind(stream),
			installDrivers.bind(stream),
			startServer.bind(stream),
			runTests.bind(stream)
		], function (err) {

			// Kill server regardless of result.
			killServer().then(function () {
				if (!err) {
					return callback();
				}

				var error = new gutil.PluginError('rf-cucumber', {
					message: err,
					showStack: false
				});

				callback(error);
				stream.emit('end');
			}).catch(console.log.bind(console));
		});
	};

	return through.obj(collect, run);

};
