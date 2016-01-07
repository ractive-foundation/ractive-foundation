var _           = require('lodash-compat');
var selenium    = require('selenium-standalone');
var gutil       = require('gulp-util');
var http        = require('http');
var Q           = require('q');

module.exports = function (options) {

	var server;
	var seleniumServer;
	var isSeleniumServerRunning;
	var options = options || {};
	var seleniumOptions = options.seleniumOptions || {};
	var seleniumInstallOptions = options.seleniumInstallOptions || {};

	options = _.defaults(options, {
		install: true
	});

	/**
	 * Helper function to see if Selenium server is already running.
	 * @param callback
	 */
	var pingSelenium = function(options) {
		options = options || {};
		return Q.Promise(function (resolve, reject) {

			if (options.seleniumOptions && options.seleniumOptions.alwaysSpawn) {
				return resolve(false);
			}

			gutil.log(gutil.colors.gray('Checking if Selenium server is running'));

			var opts = {
				host: options.host || 'localhost',
				port: options.port || 4444,
				path: '/wd/hub/status'
			};

			http.get(opts, function() {
				gutil.log(gutil.colors.green('Selenium server is running'));
				isSeleniumServerRunning = true;
				resolve(isSeleniumServerRunning);
			}).on('error', function() {
				gutil.log(gutil.colors.gray('Selenium server is not running'));
				resolve();
			});
		});
	};

	/**
	 * Start the Selenium server
	 * @param callback
	 */
	var startServer = function(options) {
		options = options || seleniumOptions;
		return Q.Promise(function (resolve, reject) {

			if (server && isSeleniumServerRunning || options.nospawn) {
				gutil.log(gutil.colors.gray('Standalone server is running'));
				return reject();
			}

			gutil.log('Starting', '\'' + gutil.colors.cyan('selenium standalone server') + '\'...');

			server = selenium.start(options, function(err, child) {
				if (err) {
					return reject(err);
				}

				gutil.log(gutil.colors.green('Selenium server successfully started'));
				seleniumServer = child;
				isSeleniumServerRunning = true;
				return resolve(child);
			});
		});
	};

	/**
	 * Process to kill server on completion
	 */
	var killServer = function () {
		return Q.Promise(function (resolve, reject) {
			if (!seleniumServer) {
				gutil.log(gutil.colors.red('Cannot kill standalone server.'));
				return reject('Cannot kill standalone server.');
			}

			if (options.seleniumOptions &&  options.seleniumOptions.kill === false) {
				gutil.log(gutil.colors.green('Configured not to kill selenium.'))
				gutil.log('Finished', '\'' + gutil.colors.cyan('selenium standalone server') + '\'...');
				return resolve();
			}

			seleniumServer.kill();
			seleniumServer.on('close', function (code, signal) {
				gutil.log('Finished', '\'' + gutil.colors.cyan('selenium standalone server') + '\'...');
				return resolve(signal);
			});
			seleniumServer.on('error', function (code, signal) {
				gutil.log(gutil.colors.red('Failed to kill server!'));
				return reject(signal);
			});
		});
	};

	/**
	 * Install webdrivers for selenium to use.
	 * @param callback
	 */
	var installDrivers = function () {
		return Q.Promise(function (resolve, reject) {
			gutil.log(gutil.colors.gray('Installing driver(s) if needed'));

			seleniumInstallOptions = _.defaults(seleniumInstallOptions, {
				logger: gutil.log
			});

			selenium.install(seleniumInstallOptions, function(err) {
				if (err) {
					return reject(err);
				}

				gutil.log(gutil.colors.green('Driver installed!'));
				return resolve();
			});
		});
	};

	var init = function () {

		var promise = options.install ? installDrivers(seleniumInstallOptions) : Q.resolve();

		return promise.then(function () {
			return pingSelenium(options);
		}).then(function (isServerRunning) {
			return isServerRunning ? Q.resolve() : startServer(seleniumOptions);
		});

	};

	return {
		installDrivers: installDrivers,
		killServer: killServer,
		startServer: startServer,
		pingSelenium: pingSelenium,
		init: init
	};

};
