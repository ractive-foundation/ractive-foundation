/**
 * Gulp task to create components, including dynamic content.
 * Very simple.
 *
 * TODO Consider async code style, but really, it takes 1.16ms to run this code on my laptop.
 */

var _ = require('lodash'),
	fs = require('fs');

const PLUGIN_ERROR_NAME_PARAM = 'wing needs --name param to work.';
const GULP_WING_SOURCE_PATH_PREFIX = './tasks/gulpWingFiles/';
const GULP_WING_TARGET_PATH_PREFIX = './src/components/';
const GULP_WING_PLACEHOLDER = 'wingComponent';

function processFileAndSave(name, fileType, destPath) {
	var fc = fs.readFileSync(GULP_WING_SOURCE_PATH_PREFIX + 'wingComponent.' + fileType, 'UTF-8');
	fc = fc.replace(new RegExp(GULP_WING_PLACEHOLDER, 'g'), name);
	fs.writeFileSync(destPath + name + '.' + fileType, fc);
}

module.exports = function (options) {

	var args = process.argv.slice(2);

	if (args[1] !== '--name') {
		throw new Error(PLUGIN_ERROR_NAME_PARAM);
	}

	// Force name to lower case for use in files and directories, its our convention.
	var name = _.trim(args[2]).toLowerCase();

	if (name === '') {
		throw new Error(PLUGIN_ERROR_NAME_PARAM);
	}

	var destPath = GULP_WING_TARGET_PATH_PREFIX + name + '/';
	fs.mkdirSync(destPath);

	processFileAndSave(name, 'js', destPath);
	processFileAndSave(name, 'hbs', destPath);
	processFileAndSave(name, 'scss', destPath);

	return true;

};