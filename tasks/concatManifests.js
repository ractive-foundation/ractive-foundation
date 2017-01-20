var through  = require('through'),
	gulputil = require('gulp-util'),
	path     = require('path'),
	fs       = require('fs'),
	find     = require('find'),
	File     = gulputil.File;

var PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-concat-manifests';

function renderDocumentation(fileName) {

	if (!fileName) {
		throw new PluginError(PLUGIN_NAME, 'Missing fileName option for ' + PLUGIN_NAME);
	}

	var data = [];
	var firstFile = null;

	function getPaths(filePath) {
		return {
			readme:      path.join(path.dirname(filePath), 'README.md'),
			useCasesDir: path.join(path.dirname(filePath), 'use-cases')
		};
	}

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

		var paths = getPaths(file.history[0]);

		var out = {
			componentName: file.history[0].split(path.sep).reverse()[1],
			readme:        fs.readFileSync(paths.readme, 'UTF-8'),
			manifest:      JSON.parse(file.contents.toString()),
			useCasePaths: []
		};

		try {
			out.useCases = find.fileSync(/.*[.]json$/, paths.useCasesDir)
				.map(function (useCase) {
					var json = JSON.parse(fs.readFileSync(useCase, 'UTF-8')),
						regex = new RegExp('^.*' + (path.sep === '\\' ? '\\\\' : path.sep) ),
						name = useCase.replace(regex, '').replace(/[.]json$/, '');

					var componentName = /ux-[A-Za-z-]*/.exec(useCase)[0],
						useCasePath = useCase.substring(useCase.indexOf(componentName));

					out.useCasePaths.push(useCasePath);

					json.name = name;
					
					return json;
				});
		} catch (e) {
			console.log('No use cases for ' + paths.useCasesDir);
		}

		data.push(out);
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
	}

	return through(bufferContents, endStream);
}


module.exports = renderDocumentation;
