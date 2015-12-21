var through = require('through2'),
    gulputil = require('gulp-util'),
    Ractive = require('ractive'),
	fs = require('fs'),
    path = require('path');

var PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-ractive-concat-objects';

function manifestFound(manifestPath) {
	try {
		return fs.statSync(filePath).isFile();
	}
	catch (err) {
		return false;
	};
}

function gulpRactive(options) {
    var stream = through.obj(function (file, enc, callback) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return callback();
        }

		var objectName = file.history[0].split(path.sep).slice(-2)[0],
			manifestPath = file.history[0].split(path.sep).slice(0, -1).join(path.sep) +
				path.sep + 'manifest.json',
			pluginType = '';

		try {
			if (fs.statSync(manifestPath).isFile()) {
				pluginType = JSON.parse(fs.readFileSync(manifestPath)).plugin;
			}
		}
		catch (err) {};

        var filecontents = '';

        try {
            filecontents = String(file.contents);

			var prefix = '';
			if (options && options.prefix) {
				prefix = options.prefix;
				if (pluginType) {
					prefix = prefix + '.' + pluginType;
				}
			}

			filecontents = prefix + '[\'' + objectName + '\'] = ' + filecontents;

            file.contents = new Buffer(filecontents);
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

module.exports = gulpRactive;