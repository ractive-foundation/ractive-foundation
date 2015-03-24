var through = require('through2'),
	gulputil = require('gulp-util'),
	Ractive = require('ractive'),
	fs = require('fs'),
	Q = require('q'),
	marked = require('marked');

var PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-generate-docs';

function gulpRactive() {

	Ractive.DEBUG = false;

	var stream = through.obj(function (file, enc, callback) {

		var stream = this;

		if (file.isStream()) {
			stream.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		try {
			// FIXME: Fix relative path
			var ractivef = require('../public/js/ractivef-cjs.js');

			var filecontents = String(file.contents);

			var ractive = new Ractive({
				template: filecontents,
				components: ractivef.components
			});

			// TODO: Improve below to rely on ractive.template object
			// https://github.com/ractivejs/template-spec#type-code-reference
			// iterating through found variables to process
			var promises = Object.keys(ractive.viewmodel.deps.default)
				.map(function (name) {
					var content = fs.readFileSync('./src/components/' + name + '/README.md');
					var compiled = marked(String(content));
					return ractive.set(name, compiled);
				});

			Q.allSettled(promises)
				.then(function () {
					var toHTML = ractive.toHTML();
					file.contents = new Buffer(toHTML);
					stream.push(file);

					return callback();
				});

		}
		catch (e) {
			console.error('Error caught from generate-docs', e);
			stream.emit('error', new PluginError(PLUGIN_NAME, 'Error:'));

			return callback();
		}

	});

	return stream;

}


module.exports = gulpRactive;