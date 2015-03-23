var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var beep = require('beepbeep');

module.exports = function (opts) {
	opts = opts || {};

	// @type false|[]paths - paths to files that failed jshint
	var fails = [];

	return through.obj(function (file, enc, callback) {
		if (file.jshint && !file.jshint.success && !file.jshint.ignored) {
			(fails = fails || []).push(file.path);
		}

		callback(null, file);

	}, function flush(callback) {
		var error;
		if (fails.length) {
			// FIXME Beep doesn't work on Ubuntu (lubuntu).
			// OS X beeps fine. Not tested on windows or other flavours of linux.
			beep();
			error = new PluginError('gulp-jshint', {
				message: 'JSHint failed for: ' + fails.join(', '),
				showStack: false
			});
		}

		callback(error);
	});
};
