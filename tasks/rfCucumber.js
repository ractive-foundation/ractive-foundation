var _           = require('lodash-compat');
var through     = require('through2');
var Cucumber    = require('cucumber');
var glob        = require('simple-glob');
var path        = require('path');

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
	var runOptions = [];

	if (options.support) {
		files = files.concat(glob([].concat(options.support)));
	}

	if (options.steps) {
		files = files.concat(glob([].concat(options.steps)));
	}

	// Set output format
	runOptions.push('-f');
	runOptions.push(format);

	var collect = function(file, enc, callback) {
		var feature = path.parse(file.path);

		if (feature.ext !== '.feature') {
			return callback();
		}

		var index = _.findIndex(files, function (step) {
			var parsedStepPath = path.parse(step);
			// Match step name with feature name, stop searching when we hit - or _
			// after first part match. In case we are looking for ux-list and we
			// come across ux-list-item.
			var regex = new RegExp('^(' + feature.name + ')[^-_]', 'gi');
			return parsedStepPath.name.match(regex);
		});

		var matchingStep = files[index];
		var args = argv.concat(['-r', matchingStep, file.path], runOptions);

		Cucumber.Cli(args).run(function(succeeded) {
			if (succeeded) {
				callback();
			} else {
				callback(new Error('Cucumber tests failed!'));
			}
		});
	};

	var runTests = function (callback) {
		this.emit('end');
		return callback();
	};

	return through.obj(collect, runTests);

};
