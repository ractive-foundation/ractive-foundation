var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var notifier = require('node-notifier');

module.exports = function (opts) {

	var fails = [];

	return through.obj(function (file, enc, callback) {
		if (file.jshint && !file.jshint.success && !file.jshint.ignored) {
			(fails = fails || []).push(file.path);
		}

		callback(null, file);

	}, function flush(callback) {
		var error;
		if (fails.length) {
			notifier.notify({
				title: 'JSHint Failed!',
				message: fails.length + ' issue(s) found.'
			});
			error = new PluginError('gulp-jshint', {
				message: 'JSHint failed for: ' + fails.join(', '),
				showStack: false
			});
		}

		callback(error);
	});
};
