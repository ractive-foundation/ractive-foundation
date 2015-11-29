/* global require, module, Buffer */

var through  = require('through2'),
	gulputil = require('gulp-util'),
	Ractive  = require('ractive'),
	fs       = require('fs'),
	path     = require('path'),
	PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-ractive-concat-objects';

function gulpRactive(options) {
	if (!options) {
		options = {};
	}
	if (!options.prefix) {
		options.prefix = 'Ractive.component';
	}

	var stream = through.obj(function (file, enc, callback) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		var objectName = file.history[0].split(path.sep).slice(-2)[0],
			manifestPath = file.history[0].split(path.sep).slice(0, -1).join(path.sep) +
				path.sep + 'manifest.json',
			pluginType = ''	
			filecontents = '';

		try {
			if (fs.statSync(manifestPath).isFile()) {
				pluginType = JSON.parse(fs.readFileSync(manifestPath)).plugin;
			}
		}
		catch (err) {};

		try {
			filecontents = String(file.contents);

			var prefix = '';
			if (options && options.prefix) {
				prefix = options.prefix;
				if (pluginType) {
					prefix = prefix + '.' + pluginType;
				}
			}

			filecontents = prefix + '[\'' + objectName + '\'] = ' + filecontents;

			file.contents = new Buffer(filecontents);
			this.push(file);
		}
		catch (e) {
			console.warn('Error caught: ' + e);
			this.push(file);
			return callback();
		}

		callback();
	});

	return stream;
}

module.exports = gulpRactive;
