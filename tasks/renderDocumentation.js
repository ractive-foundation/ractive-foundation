var through = require('through2'),
	gulputil = require('gulp-util'),
	Ractive = require('ractive'),
	marked = require('marked'),
	fs = require('fs'),
	find = require('find'),
	_ = require('lodash'),
	path = require('path'),
	makeHTML = require('json2htmljson2css').makeHTML;

var PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-concat-documentation';

function renderDocumentation() {
	var stream = through.obj(function (file, enc, callback) {

		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		try {

			var pathComponents = file.history[0].split(path.sep),
				componentName = pathComponents.slice(-2)[0],
				directory = pathComponents.slice(0, -1);

			directory.push('use_cases');
			directory = directory.join(path.sep);

			var doco = makeHTML([
				{
					tag: 'h1',
					content: componentName
				}, {
					tag: 'br'
				}
			]);

			doco += marked(String(file.contents));

			// iterate over all use cases for the component
			doco += _.map(find.fileSync(/.*\.json/, directory), function (usecase) {

				var json = JSON.parse(fs.readFileSync(usecase));

				var componentObj = {
					// rendering component props. key="value"
					tag: componentName,
					attr: _.zipObject(_.keys(json.data), _.values(json.data)),
					content: ''
				};

				return makeHTML([
					{
						tag: 'h2',
						content: 'Use case: ' + json.title
					},
					componentObj,
					{
						tag: 'pre',
						content: [{
							tag: 'code',
							content:  _.escape(makeHTML([componentObj]))
						}]
					}
				]);

			}).join('');

			file.contents = new Buffer(doco);

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


module.exports = renderDocumentation;