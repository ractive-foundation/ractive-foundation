/* global require, module, Buffer */

var through  = require('through2'),
	gulputil = require('gulp-util'),
	Ractive  = require('ractive'),
	path     = require('path'),
	PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-ractive-parse';

function gulpRactive(options) {
	if (!options) {
		options = {};
	}
	if (!options.prefix) {
		options.prefix = 'Ractive.components';
	}
	if (!options.objectName) {
		options.objectName = function(file) {
			return file.history[0].split(path.sep).slice(-2)[0];
		};
	}

	var stream = through.obj(function (file, enc, callback) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		var objectName   = options.objectName(file),
			filecontents = '';

		try {
			filecontents = String(file.contents);

			if (options.template) {
				//Parse template in Ractive
				filecontents = Ractive.parse(filecontents, options);
				filecontents = JSON.stringify(filecontents);

				filecontents = options.prefix + '[\'' + objectName + '\'] = ' + filecontents + ';';
			}
			else {
				filecontents = options.prefix + '[\'' + objectName + '\'] = ' + filecontents;
			}

			file.contents = new Buffer(filecontents);
			this.push(file);
		}
		catch (e) {
			console.warn('Error caught from Ractive.parse: ' +
			e.message + ' in ' + file.path + '. Returning uncompiled template');
			this.push(file);
			return callback();
		}

		callback();
	});

	return stream;
}

module.exports = gulpRactive;
