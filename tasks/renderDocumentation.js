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


function renderAttributes(title, options) {

	var html = makeHTML([
		{
			tag: 'hr'
		},
		{
			tag: 'h3',
			content: title
		}
	]);

	_.forEach(_.zipObject(_.keys(options), _.values(options)), function (value, key) {
		html += makeHTML([
			{
				tag: 'h4',
				content: key
			},
			{
				tag: 'p',
				content: value
			}
		]);
	});

	return html;
}
function compileUseCases (usecase) {

	var json = JSON.parse(fs.readFileSync(usecase));

	var componentName = usecase.split(path.sep).slice(-3)[0];

	var useCaseUid = _.uniqueId(
		[
			_.camelCase(componentName),
			_.camelCase(path.basename(usecase).replace('.json', '')),
			''
		].join('_')
	);

	var componentObj = {
		// rendering component props. key="value"
		tag: componentName,
		attr: _.zipObject(_.keys(json.data), _.values(json.data)),
		content: ''
	};

	// render use case doco
	var component = makeHTML([
		{
			tag: 'h2',
			content: 'Use case: ' + json.title
		},
		{
			tag: 'div',
			content: makeHTML([componentObj]) + '<ul>{{#eventName}}<li>{{this}}</li>{{/}}</ul>',
			attr: {
				class: 'panel ractivef-use-case',
				'data-useCaseUid': useCaseUid
			}
		},
		{
			tag: 'pre',
			content: [{
				tag: 'code',
				content: _.escape(makeHTML([componentObj]))
			}]
		}
	]).replace(/(\r\n|\n|\r)/gm, '');

	return component;

}

function renderDocumentation() {
	var stream = through.obj(function (file, enc, callback) {

		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		try {

			// load the interface specification
			var manifest = JSON.parse(String(file.contents));

			var pathComponents = file.history[0].split(path.sep);
			var componentName = pathComponents.slice(-2)[0];

			var directory = pathComponents.slice(0, -1);

			var readmePath = directory.concat('README.md').join(path.sep);

			var useCasesPath = directory.concat('use-cases').join(path.sep);

			var doco = makeHTML([
				{
					tag: 'h1',
					content: componentName
				}, {
					tag: 'br'
				}
			]);

			doco += marked(String(readmePath));

			// document the permitted model fields
			doco += renderAttributes('Semantic Data Model', manifest.data);

			// document the events handled
			doco += renderAttributes('Semantic Event Mapping', manifest.events);

			doco += makeHTML([{
				tag: 'hr'
			}]);

			// iterate over all use cases for the component
			doco += _.map(find.fileSync(/.*\.json/, useCasesPath), compileUseCases).join('');

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