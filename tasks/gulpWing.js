/*global module*/
/**
 * Gulp task to create components, including dynamic content.
 * Very simple.
 *
 * TODO Consider async code style, but really, it takes 1.16ms to run this code on my laptop.
 */

var _ = require('lodash'),
	fs = require('fs'),
	gutil = require('gulp-util');

const PLUGIN_NAME = 'gulp-wing';

const PLUGIN_ERROR_NAME_PARAM = 'wing needs --name param to work.';
const PLUGIN_ERROR_NAME_LOWERCASE = 'Component name must be all lowercase alphanumeric, ' +
	'and begin with "ux". Example: ux';

const GULP_WING_SOURCE_PATH_PREFIX = './tasks/gulpWingFiles/';
const GULP_WING_TARGET_PATH_PREFIX = './src/components/';
const GULP_WING_PLACEHOLDER = 'wingComponent';

var lowerCaseOnly = new RegExp('^[a-z]+$', 'g');

function processFileAndSave(name, fileType, destPath) {
	var fc = fs.readFileSync(GULP_WING_SOURCE_PATH_PREFIX + 'wingComponent.' + fileType, 'UTF-8');
	fc = fc.replace(new RegExp(GULP_WING_PLACEHOLDER, 'g'), name);
	fs.writeFileSync(destPath + name + '.' + fileType, fc);
}

module.exports = function () {

	var args = process.argv.slice(2);

	if (args[1] !== '--name') {
		throw new gutil.PluginError(PLUGIN_NAME, PLUGIN_ERROR_NAME_PARAM);
	}

	var name = _.trim(args[2]);

	if (name.length < 2) {
		throw new gutil.PluginError(PLUGIN_NAME, PLUGIN_ERROR_NAME_PARAM);
	}

	// Names of components MUST be lowercase, and start with 'ux'.
	if (!lowerCaseOnly.test(name) || 'ux' !== name.substr(0, 2)) {
		throw new gutil.PluginError(PLUGIN_NAME, PLUGIN_ERROR_NAME_LOWERCASE + name.toLowerCase());
	}

	var destPath = GULP_WING_TARGET_PATH_PREFIX + name + '/';
	fs.mkdirSync(destPath);

	_.map(['js', 'hbs', 'scss'], function (fileType) {
		processFileAndSave(name, fileType, destPath);
	});

	return true;

};