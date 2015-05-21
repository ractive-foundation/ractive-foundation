/*global module*/
/**
 * Gulp task to create components, including dynamic content.
 * Very simple.
 *
 * TODO Consider async code style, but really, it takes 1.16ms to run this code on my laptop.
 */

var _ = require('lodash-compat'),
	fs = require('fs'),
	gutil = require('gulp-util'),
	path = require('path'),
	walk = require('walk');

const PLUGIN_NAME = 'gulp-wing';

const PLUGIN_ERROR_NAME_PARAM = 'wing needs --name param to work.';
const PLUGIN_ERROR_NAME_LOWERCASE = 'Component name must be all lowercase alphanumeric, ' +
	'and begin with "ux-". Example: ux-';

const GULP_WING_SOURCE_PATH_PREFIX = './tasks/gulpWingFiles';
const GULP_WING_TARGET_PATH_PREFIX = './src/components/';
const GULP_WING_PLACEHOLDER = 'wingComponent';

var lowerCaseOnly = new RegExp('^[a-z-]+$', 'g');

function processFileAndSave(name, destPath, root, sourceFile) {

	var source = [root, '/', sourceFile],
		regex = new RegExp(GULP_WING_PLACEHOLDER, 'g'),
		targetFile = sourceFile.replace(regex, name),
		fc = fs.readFileSync(source.join(''), 'UTF-8');

	fc = fc.replace(regex, name);

	var dir = root.replace(GULP_WING_SOURCE_PATH_PREFIX, '');
	if (dir) {
		dir += '/';
	}

	fs.writeFileSync(destPath + dir + targetFile, fc);
}

module.exports = function () {

	var option = require('node-getopt-long').options([
		['name|n=s', {
			description: 'The name of the component to create',
			paramName: 'ux-...',
			test: function (value) {
				// Check for ux-*, including nothing at all to error out on.
				if (value.length < 4) {
					throw new gutil.PluginError(PLUGIN_NAME, PLUGIN_ERROR_NAME_PARAM);
				}

				// Names of components MUST be lowercase, and start with 'ux-'.
				if (!lowerCaseOnly.test(value) || 'ux-' !== value.substr(0, 3)) {
					throw new gutil.PluginError(PLUGIN_NAME, PLUGIN_ERROR_NAME_LOWERCASE + value.toLowerCase());
				}

				return value;
			}
		}]
	], {
		name: 'gulp wing'
	});

	if (!option.name) {
		throw new gutil.PluginError(PLUGIN_NAME, PLUGIN_ERROR_NAME_PARAM);
	}

	var destPath = GULP_WING_TARGET_PATH_PREFIX + option.name + '/';
	fs.mkdirSync(destPath);
	// Create deep folder
	fs.mkdirSync(destPath + 'use-cases/');


	// Recurse through all files and folders in source.
	var walker = walk.walk(GULP_WING_SOURCE_PATH_PREFIX, {followLinks: false});
	walker.on('file', function (root, stat, next) {
		processFileAndSave(option.name, destPath, root, stat.name);
		next();
	});

	return true;

};
