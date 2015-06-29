var through = require('through2');
var path = require('path');

module.exports = function () {

	var run = function(file, enc, callback) {

		var parsed = path.parse(file.path);
		if (file.path.indexOf('index.js') !== -1) {
			// Re-name all files that are called `index.js`
			var basename = parsed.dir.split(path.sep).reverse()[0];
			file.path = path.join(file.base, basename + parsed.ext);
		} else {
			// If has own name, just remove structure.
			file.path = path.join(file.base, parsed.base);
		}

		this.push(file);
		callback(null, file);

	};

	return through.obj(run);

};
