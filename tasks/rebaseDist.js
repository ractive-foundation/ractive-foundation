var through = require('through2');
var path = require('path');

module.exports = function () {

	var rename = [];

	var collect = function(file, enc, callback) {
		if (file.path.indexOf('index.js') !== -1) {
			// Re-name all files that are called `index.js`
			rename.push(file);
		} else {
			// If has own name, just remove structure.
			var parsed = path.parse(file.path);
			file.path = path.join(file.base, parsed.base);
		}

		callback(null, file);
	};

	var run = function(callback) {

		rename.forEach(function (file) {
			var parsed = path.parse(file.path);
			var basename = parsed.dir.split(path.sep).reverse()[0];

			file.path = path.join(file.base, basename + parsed.ext);

			this.push(file);
		}.bind(this));

		callback();
	};

	return through.obj(collect, run);

};
