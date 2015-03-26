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

Ractive.DEBUG = false;

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

function renderUseCases(usecase) {

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

	var componentObjToRender = _.cloneDeep(componentObj);
	componentObjToRender.attr.uid = useCaseUid;

	// render use case doco
	var component = makeHTML([
		{
			tag: 'h5',
			content: 'Use case: ' + json.title
		},
		{
			tag: 'div',
			content: makeHTML([componentObjToRender]) + '<ul>{{#events.' + useCaseUid + '}}<li>{{this}}</li>{{/}}</ul>',
			attr: {
				class: 'ractivef-use-case',
				id: useCaseUid
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
			var manifests = JSON.parse(String(file.contents));
			//manifests = _.indexBy(manifests, 'componentName');

			var componentsHTML = _(manifests).map(function (manifest) {
				var paths = {
					componentDir : ['.', 'src', 'components', manifest.componentName, ''].join(path.sep)
				};
				paths.readme = paths.componentDir + 'README.md';
				paths.useCasesDir = paths.componentDir + 'use-cases';

				var readmeMd = fs.readFileSync(paths.readme);

				var doco = makeHTML([
					{
						tag: 'h3',
						content: manifest.componentName
					},
					{
						tag: 'br'
					}
				]);
				doco += marked(String(readmeMd));

				var out = {
					doco: doco,
					useCasesHTML: _.map(find.fileSync(/.*\.json/, paths.useCasesDir), renderUseCases).join('')
				};
				out.manifestHTML = renderAttributes('Semantic Event Mapping', manifest.events);
				out.manifestHTML += renderAttributes('Semantic Data Model', manifest.data);

				return out;

			}).value();


			var docFile = String(fs.readFileSync('./src/docs.html'));

			var ractive = new Ractive({
				template: docFile,
				data: {
					components: componentsHTML
				}
			});

			var toHTML = ractive.toHTML();

			file.contents = new Buffer(toHTML);

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