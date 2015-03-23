var through = require('through2');
//var PluginError = require('gulp-util').PluginError;
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

	}, function flush(cb) {
		if (fails.length) {
			beep();
		} else {
			cb();
		}


	});
};
