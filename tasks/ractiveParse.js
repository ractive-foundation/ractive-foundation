var through = require('through2'),
	gulputil = require('gulp-util'),
	Ractive = require('ractive'),
	path = require('path');

var PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-ractive-parse';

function ractiveTemplateParse(file, options) {
	var componentName;
	if (options.test) {
		var parts = file.history[0].split(path.sep).slice(-3);
		componentName = parts[0] + '-' + parts[2].replace(/[.]hbs$/, '');
	}
	else {
		componentName = file.history[0].split(path.sep).slice(-2)[0];
	}

	var filecontents = '';

	filecontents = String(file.contents);

	//Parse template in Ractive
	filecontents = Ractive.parse(filecontents, options);
	filecontents = JSON.stringify(filecontents);

	filecontents = options.prefix + '[\'' + componentName + '\'] = ' + filecontents + ';';

	return filecontents;
}

function gulpRactive(options) {
	var stream = through.obj(function (file, enc, callback) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		try {
			file.contents = new Buffer(ractiveTemplateParse(file, options));
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
