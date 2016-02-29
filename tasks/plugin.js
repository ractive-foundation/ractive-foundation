/* global require, module, Buffer */

var through     = require('through2'),
	gulputil    = require('gulp-util'),
	util        = require('./utils'),
	_           = require('lodash'),
	fs          = require('fs'),
	path        = require('path'),
	PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-ractive-foundation-plugin';

function plugin(options) {
	return through.obj(function (file, enc, callback) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		if (fs.statSync(file.path).isFile()) {
			var pluginType = JSON.parse(fs.readFileSync(file.path)).plugin;
			if (pluginType) {
				options.type = pluginType;
			}
		}
		options.suffix = ';';

		util.getComponent(file.path, options)
			.then(function(contents) {
				file.path = file.base + options.file2object(file, options) + '.js';
				file.contents = new Buffer(contents[0]);

				this.push(file);

				callback();
			}.bind(this));
	});
}

module.exports = function(defaults) {
	return function(options) {
		options = options ? _.merge(_.clone(defaults), options) : _.clone(defaults);

		return plugin(options);
	};
};
