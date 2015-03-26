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

function renderAttributes(options) {

	var html = _.map(_.zipObject(_.keys(options), _.values(options)), function (value, key) {
		return makeHTML([
			{
				tag: 'kbd',
				content: key
			},
			{
				tag: 'span',
				content: ' - ' + value
			},
			{
				tag: 'br'
			}
		]);
	});

	return html.join('');
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

	console.log('json.isDataModel', json.isDataModel);

	var attr;

	if (json.isDataModel) {
		attr = {
			datamodel: _.escape(_.escape(JSON.stringify(json.data)))
		};
	} else {
		attr = _.zipObject(_.keys(json.data), _.values(json.data));
	}

	console.log('attr', attr);

	var componentObj = {
		tag: componentName,
		attr: attr,
		content: ''
	};

	var componentUseCase = _.cloneDeep(componentObj);
	componentUseCase.attr.uid = useCaseUid;

	componentObj.attr.datamodel = '{{dataModel}}';

	// render use case doco
	var component = makeHTML([
		{
			tag: 'h5',
			content: 'Use case: ' + json.title
		},
		{
			tag: 'div',
			content: makeHTML([componentUseCase]) + '<ul>{{#events.' + useCaseUid + '}}<li>{{this}}</li>{{/}}</ul>',
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
				var paths = {},
					out = {};

				paths.componentDir = ['.', 'src', 'components', manifest.componentName, ''].join(path.sep);
				paths.readme = paths.componentDir + 'README.md';
				paths.useCasesDir = paths.componentDir + 'use-cases';

				out.useCasesHTML = _.map(find.fileSync(/.*\.json/, paths.useCasesDir), renderUseCases).join('');

				out.readmeMd = marked(String(fs.readFileSync(paths.readme)));

				out.componentName = manifest.componentName;

				out.manifestHTML = {
					events: renderAttributes(manifest.events),
					dataModel: renderAttributes(manifest.data)
				};

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

			console.log('toHTML', toHTML);

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