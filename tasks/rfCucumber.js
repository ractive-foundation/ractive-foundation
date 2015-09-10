var gutil = require('gulp-util');
var through = require('through2');
var Cucumber = require('cucumber');
var glob = require('simple-glob');

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

	var argv = ['node', 'cucumber-js'];
	var format = options.format || 'pretty';
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

	// Run all cucumber tests at once.
	// TODO Run them one by one. Fail early.
	var runTests = function (callback) {

		var stream = this;
		argv.push.apply(argv, runOptions);
		argv.push.apply(argv, features);

		Cucumber.Cli(argv).run(function(succeeded) {
			if (succeeded) {
				stream.emit('end');
				return callback();
			} else {
				callback(new Error('Cucumber tests failed!'));
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

	return through.obj(collect, runTests);

};
