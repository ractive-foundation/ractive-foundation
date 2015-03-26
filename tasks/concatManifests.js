var through = require('through'),
	gulputil = require('gulp-util'),
	path = require('path'),
	File = gulputil.File;

var PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-concat-manifests';

function renderDocumentation(fileName) {

	if (!fileName) {
		throw new PluginError(PLUGIN_NAME, 'Missing fileName option for ' + PLUGIN_NAME);
	}

	var data = [];
	var firstFile = null;

	function bufferContents(file) {
		if (!firstFile) {
			firstFile = file;
		}

		if (file.isNull()) {
			return; // ignore
		}
		if (file.isStream()) {
			return this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
		}

		var key = file.history[0].split(path.sep).reverse()[1];
		var obj = JSON.parse(file.contents.toString());

		obj.componentName = key;

		data.push(obj);
	}

	function endStream() {
		var joinedPath = path.join(firstFile.base, fileName);

		var joinedFile = new File({
			cwd: firstFile.cwd,
			base: firstFile.base,
			path: joinedPath,
			contents: new Buffer(JSON.stringify(data))
		});

		this.emit('data', joinedFile);
		this.emit('end');
		;
	}

	return through(bufferContents, endStream);
}


module.exports = renderDocumentation;