var through = require('through2'),
    gulputil = require('gulp-util'),
    Ractive = require('ractive'),
    path = require('path');

var PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-ractive-concat-components';

function gulpRactive(options) {
    var stream = through.obj(function (file, enc, callback) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return callback();
        }

        var componentName = file.history[0].split(path.sep).slice(-2)[0];

        var filecontents = '';

        try {
            filecontents = String(file.contents);

			var prefix = '';
			if (options && options.prefix) {
				prefix = options.prefix + '.';
			}

			filecontents = options.prefix + '[\'' + componentName + '\'] = ' + filecontents;

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