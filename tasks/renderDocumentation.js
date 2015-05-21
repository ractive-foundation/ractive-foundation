var through   = require('through2'),
	gulputil  = require('gulp-util'),
	Ractive   = require('ractive'),
	marked    = require('marked'),
	fs        = require('fs'),
	_         = require('lodash-compat'),
	path      = require('path'),
	makeHTML  = require('json2htmljson2css').makeHTML,
	VinylFile = require('vinyl');

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

function renderUseCases(useCase, componentName) {

	var useCaseUid = _.uniqueId(
		[
			_.camelCase(componentName),
			_.camelCase(path.basename(useCase).replace('.useCase', '')),
			''
		].join('_')
	);

	var attr;

	if (useCase.isDataModel) {
		attr = {
			datamodel: _.escape(_.escape(JSON.stringify(useCase.data)))
		};
	} else {
		attr = _.zipObject(_.keys(useCase.data), _.values(useCase.data));
	}

	var componentObj = {
		tag: componentName,
		attr: attr,
		content: ''
	};

	var componentUseCase = _.cloneDeep(componentObj);
	componentUseCase.attr.uid = useCaseUid;

	if (useCase.isDataModel) {
		componentObj.attr.datamodel = '{{dataModel}}';
	}

	// render use case doco
	var component = makeHTML([
		{
			tag: 'h5',
			content: 'Use case: ' + useCase.title
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

/**
 * Transform intermediate data into final data model for sidenav.
 */
function getSideNavDataModel(manifests) {

	var sideNavData = {};

	// Build up sideNavDataModel first.
	_.each(manifests, function (manifest) {
		var cat = manifest.manifest.category || 'uncategorised';
		sideNavData[cat] = sideNavData[cat] || [];
		sideNavData[cat].push(manifest.componentName);
	});

	var sideNavDataModel = {
		title: 'Docs Nav',
		items: []
	};

	// Sort categories alphabetically for display.
	var sortedCategories = Object.keys(sideNavData).sort();

	_.each(sortedCategories, function (categoryName) {

		sideNavDataModel.items.push({
			isHeading: true,
			label: categoryName
		});

		_.each(sideNavData[categoryName], function (componentName) {

			sideNavDataModel.items.push({
				label: componentName,
				// Link to individual component pages.
				href: componentName + '.html'
			});

		});

	});

	return sideNavDataModel;

}

/**
 * All these components need an index page to get started.
 */
function getIndexFile (indexFile, sideNavDataModel, file) {

	var ractive = new Ractive({
		template: indexFile,
		data: {
			sideNavDataModel: sideNavDataModel
		}
	});

	var html = ractive.toHTML();

	// Modify manifest-rf.json file data to create individual component html files for output.
	var parsed = path.parse(file.path);
	parsed.name = 'components';
	parsed.base = 'components.html';
	parsed.ext = '.html';

	var componentFile = new VinylFile({
		cwd: './',
		base: 'public',
		path: path.format(parsed),
		contents: new Buffer(html)
	});

	return componentFile;

}

/**
 * Create a single component documentation file.
 */
function getComponentFile (manifest, docFile, sideNavDataModel, file) {

	var component = {
		readmeMd:      marked(manifest.readme),
		componentName: manifest.componentName,
		manifestHTML:  {
			events:    renderAttributes(manifest.manifest.events),
			dataModel: renderAttributes(manifest.manifest.data)
		}
	};

	// Render all use cases into html.
	component.useCasesHTML = _.map(manifest.useCases, function (useCase) {
		return renderUseCases(useCase, manifest.componentName);
	}).join('');

	var ractive = new Ractive({
		template: docFile,
		data: {
			sideNavDataModel: sideNavDataModel,
			component: component
		}
	});

	var toHTML = ractive.toHTML();

	// Modify manifest-rf.json file data to create individual component html files for output.
	var parsed = path.parse(file.path);
	parsed.name = manifest.componentName;
	parsed.base = manifest.componentName + '.html';
	parsed.ext = '.html';

	var componentFile = new VinylFile({
		cwd: './',
		base: 'public',
		path: path.format(parsed),
		contents: new Buffer(toHTML)
	});

	return componentFile;

}

/**
 * Stream through manifest-all.js - all the component manifest files.
 */
function renderDocumentation(options) {

	var stream = through.obj(function (file, enc, callback) {

		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return callback();
		}

		try {

			// load the interface specification
			var manifests = JSON.parse(String(file.contents));

			var docFile = fs.readFileSync(options.docSrcPath, 'UTF-8');
			var indexFile = fs.readFileSync(options.indexSrcPath, 'UTF-8');

			// Build up sideNavDataModel first.
			var sideNavDataModel = _.escape(JSON.stringify(getSideNavDataModel(manifests)));

			// Create the component index page, using the sidenav.
			this.push(getIndexFile(indexFile, sideNavDataModel, file));

			// Now create separate component docs pages.
			_.each(manifests, function (manifest) {
				this.push(getComponentFile (manifest, docFile, sideNavDataModel, file));
			}.bind(this));

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
