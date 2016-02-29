/* global require, module, Buffer */

var through     = require('through2'),
	gulputil    = require('gulp-util'),
	util        = require('./utils.js'),
	_           = require('lodash'),
	fs          = require('fs'),
	Ractive     = require('ractive'),
	PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-ractive-foundation-documentation';

function documentation(options) {
	options.ractive = util.getTemplates(options.partials)
		.then(function(partials) {
			var template = Ractive.parse(fs.readFileSync(options.template, 'UTF-8'), options);

			return new Ractive({
				template: template,
				partials: partials,
				data: {},
				delimiters: options.delimiters,
				tripleDelimiters: options.tripleDelimiter
			});
		})
		.catch(function(err) {
			throw new PluginError(PLUGIN_NAME, 'Could not initialise Ractive: ' + err);
		});

	return through.obj(function (file, enc, callback) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		util.getDocumentation(file.path, options)
			.then(function(contents) {
				file.path = file.base + options.file2object(file, options) + '.html';
				file.contents = new Buffer(contents);

				this.push(file);

				callback();
			}.bind(this));
	});
}

module.exports = function(defaults) {
	return function(options) {
		options = options ? _.merge(_.clone(defaults), options) : _.clone(defaults);

		return documentation(options);
	};
};
