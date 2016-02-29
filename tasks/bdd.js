/* global require, module */

var through     = require('through2'),
	gulputil    = require('gulp-util'),
	util        = require('./utils'),
	_           = require('lodash'),
	PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-ractive-foundation-bdd';

function bdd(options) {
	return through.obj(function (file, enc, callback) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		options.selServer
			.then(function() {
				util.runBdd(file.path, options)
					.then(function(contents) {
						callback();
					}.bind(this));
			}.bind(this))
			.catch(function() {
				this.emit('end');
				return callback();
			}.bind(this));
	});
}

module.exports = function(defaults) {
	return function(options) {
		options = options ? _.merge(_.clone(defaults), options) : _.clone(defaults);

		return bdd(options);
	};
};
