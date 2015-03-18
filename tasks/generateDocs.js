var through = require('through2'),
	gulputil = require('gulp-util'),
	Ractive = require('ractive'),
	_ = require('lodash'),
	fs = require('fs'),
	path = require('path'),
	glob = require('glob'),
	marked = require('marked');
	marked.setOptions({
		sanitize: true
	});
var PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-generate-docs';

function gulpRactive(filename) {
	Ractive.DEBUG = false;

		var filecontents = String(fs.readFileSync(filename));


		var ractive = new Ractive({
			template: filecontents
		});

		// TODO: Improve below to rely on ractive.template object
		// https://github.com/ractivejs/template-spec#type-code-reference
		_(ractive.viewmodel.deps.default)
			.keys()
			.map(function (name) {
				console.log('name', name);
				var content = fs.readFileSync('./src/components/' + name + '/README.md');
				var compiled = marked(String(content));
				console.log('compiled', compiled);
				ractive.set(name, marked(String(content)));
			})
			.value();

		console.log('-----------------------------------------------');

		var toHTML = ractive.toHTML();
		console.log('toHTML', toHTML);
		fs.writeFileSync('./public/indextest2.html', toHTML);

	try {
	}
	catch (e) {
		console.warn('Error caught from generate-docs');
	}

};


module.exports = gulpRactive;