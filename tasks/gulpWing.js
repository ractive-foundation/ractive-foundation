/*global module*/
/**
 * Gulp task to create components, including dynamic content.
 * Very simple.
 *
 * TODO Consider async code style, but really, it takes 1.16ms to run this code on my laptop.
 */

var fs = require('fs'),
	gutil = require('gulp-util'),
	walk = require('walk');

const PLUGIN_NAME = 'gulp-wing';

const PLUGIN_ERROR_NAME_PARAM = 'wing needs --name param to work.';

const GULP_WING_SOURCE_PATH_PREFIX = './tasks/gulpWingFiles';
const GULP_WING_TARGET_PATH_PREFIX = './src/components/';
const GULP_WING_PLACEHOLDER = 'wingComponent';

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

module.exports = function (option) {

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
