/* global require, module */

var component     = require('./tasks/component'),
	template      = require('./tasks/template'),
	plugin        = require('./tasks/plugin'),
	manifest      = require('./tasks/manifest'),
	documentation = require('./tasks/documentation'),
	bdd           = require('./tasks/bdd'),
	_             = require('lodash'),
	fs            = require('fs'),
	path          = require('path');

var defaults = {
	useCases:         'use-cases',
	type:             'components',
	buildTemplates:   'src/buildTemplates',
	buildPartials:    'src/buildPartials',
	delimiters:       ['{{', '}}'],
	tripleDelimiters: ['{{', '}}'],
	format:           'pretty',
	prefix: {
		components:  'Ractive.components',
		decorators:  'Ractive.decorators',
		partials:    'Ractive.partials',
		templates:   'Ractive.defaults.templates',
		transitions: 'Ractive.transitions',
	},
	file2object: function (file, options) {
		file = typeof file === 'string' ? file : file.path;
		var parts = file.split(path.sep);

		try {
			// remove the file name form parts
			if (fs.statSync(file).isFile()) {
				parts.pop();
			}
		}
		catch (e) {
		}

		// get the directory name
		var dir  = parts.pop();

		// if the directory is a use cases directory
		// pop that off as well
		if (dir === options.useCases) {
			dir = parts.pop();
		}

		// return the directory as the object name
		return dir;
	}
};

module.exports = function(options) {
	// set up defaults
	options = options ? _.merge(_.clone(defaults), options) : _.clone(defaults);

	// initialise the components
	var object = {
		component    : component(options),
		template     : template(options),
		plugin       : plugin(options),
		manifest     : manifest(options),
		documentation: documentation(options),
		bdd          : bdd(options)
	};

	return object;
};
