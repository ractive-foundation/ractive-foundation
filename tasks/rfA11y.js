var args = require('yargs').argv,
	_ = require('lodash-compat'),
	glob = require('simple-glob'),
	nodePath = require('path'),
	Q = require('q'),
	gutil = require('gulp-util'),
	a11y = require('a11y');

module.exports = function (options) {

	// Command line overrides
	var component = args.component || args.c || '*';
	var usecase = args.usecase || args.u || '*'

	// Pass port in, else default.
	var port = options && options.port || '8089';

	// Create test harness URLs from all use cases in the repo.
	var urls = _(glob('./src/components/' + component + '/use-cases/' + usecase + '.json'))
		.map(function (useCase) {
			var parsed = nodePath.parse(useCase);
			var arr = parsed.dir.split(nodePath.sep);
			return [
				'http://localhost:' + port + '/testRunner.html#!/component',
				arr[3],
				'use-case',
				parsed.name
			].join('/');
		})
		.value();

	var promises = _.map(urls, function (url) {

		// gutil.log('Running a11y for url', url);

		return Q.Promise(function (resolve, reject) {
			a11y(url, function (err, reports) {

				if (err) {
					reject(err);
				}

				var failures = reports.audit && _.where(reports.audit, { result: 'FAIL' });

				if (failures && failures.length > 0) {
					gutil.log(gutil.colors.red('a11y FAIL ' +  url) +'\n\n' + reports.report + '\n');
					reject('a11y FAIL on one or more urls, see log');
				} else {
					gutil.log(gutil.colors.green('a11y PASS ' +  url));
					resolve('a11y PASS ' + url);
				}

			});
		});

	});

	// Wrap the a11y work up using a deferred promise, for a cleaner API.
	var result = Q.defer();

	// Only pass gulp task if ALL tests pass.
	Q.allSettled(promises).then(function (results) {
		var rejected = _.where(results, { state: 'rejected' });
		if (rejected && rejected.length > 0) {
			result.reject('One or more a11y tests failed, see log.');
		}
		result.resolve();
	});

	return result.promise;

};