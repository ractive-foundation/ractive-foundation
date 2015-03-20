var through = require('through2'),
    gulputil = require('gulp-util'),
    Ractive = require('ractive'),
    marked = require('marked'),
    fs = require('fs'),
    find = require('find'),
    _ = require('lodash'),
    xml = require('xml-escape'),
    path = require('path');

var PluginError = gulputil.PluginError;

const PLUGIN_NAME = 'gulp-concat-documentation';

function renderDocumentation(options) {
    var stream = through.obj(function (file, enc, callback) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return callback();
        }

        var pathComponents = file.history[0].split(path.sep);
        var componentName = pathComponents.slice(-2)[0];
        var directory = pathComponents.slice(0,-1).join('/') + '/use_cases/';

        var doco = '<h1>' + componentName + "</h1>\n<br>\n";
        var doco = doco + marked(String(file.contents));

        try {
            // iterate over all use cases for the component
            _.forEach(find.fileSync(/.*\.json/, directory), function(usecase) {

                var json = JSON.parse(fs.readFileSync(usecase));

                doco = doco + "<h2>Use case: " + json['title'] + "</h2>";

                // iterate over all the keys in the use case data to render button
                doco = doco + "<" + componentName;
                _.forEach(json['data'], function(value, key) {
                    doco = doco + " " + key + "='" + value + "'";
                });

                doco = doco + "></" + componentName + ">";

                // iterate over all keys in the use case data to render code for this use case
                doco = doco + "<pre><code class=\"lang-js\">&lt;" + componentName;
                _.forEach(json['data'], function(value, key) {
                    doco = doco + " " + xml(key) + "='" + xml(value) + "'";
                });

                doco = doco + "&gt;&lt;/" + componentName + "&gt;</code></pre>";

            });

            file.contents = new Buffer(doco);
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


module.exports = renderDocumentation;