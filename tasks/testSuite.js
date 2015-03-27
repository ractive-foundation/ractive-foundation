var selenium = require('selenium-standalone');
var cucumber = require('gulp-cucumber');

/**
 * Simple wrapper around gulp-cucumber to start selenium and any other deps before hand.
 * @param options
 * @returns {*|exports}
 */
module.exports = function (options) {

	selenium.start({ stdio: 'pipe' }, function (err, child) {
		if (err) {
			throw new Error(err);
		}
		// Purely selenium server debugging output.
		child.stderr.on('data', function (data){
			console.log(data.toString());
		});
	});

	return cucumber(options);
};
