var _           = require('lodash-compat');
var through     = require('through2');
var Cucumber    = require('cucumber');
var glob        = require('simple-glob');
var path        = require('path');

/**
 * rfCucumber runs each step and feature in isolation to avoid any
 * contextual issues.
 * @param options
 */
module.exports = function (options) {

	var argv = ['node', 'cucumber-js'];
	var format = options.format || 'pretty';
	var tags = [];
	var files = [];
	var runOptions = ['-f', format];

	if (options.support) {
		files = files.concat(glob([].concat(options.support)));
	}

	if (options.steps) {
		files = files.concat(glob([].concat(options.steps)));
	}

	// Support tags in array or string format
	// @see https://github.com/cucumber/cucumber/wiki/Tags
	if (options.tags) {
		tags = ['--tags', options.tags];
		if (_.isArray(options.tags)) {
			if (options.requireAllTags) {
				tags = _(options.tags)
					.map(function (tag) {
						return ['--tags', tag]
					})
					.flatten()
					.value();
			} else {
				tags = ['--tags', options.tags.join(',')];
			}
		}
	}

	var parseAndRunTests = function(file, enc, callback) {
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
		var args = argv.concat(['-r', matchingStep, file.path], runOptions, tags);

		Cucumber.Cli(args).run(function(succeeded) {
			if (succeeded) {
				callback();
			} else {
				callback(new Error('Cucumber tests failed!'));
			}
		});
	};

	var finish = function (callback) {
		this.emit('end');
		return callback();
	};

	return through.obj(parseAndRunTests, finish);

};
