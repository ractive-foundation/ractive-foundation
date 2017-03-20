module.exports = function () {
	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	// https://github.com/kriskowal/q/wiki/API-Reference
	var q = require('q');

	var _ = require('lodash-compat');

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (scenario, callback) {
		this.component = {};
		this.component.container = '#template .container';
		this.component.testDivs = this.component.container + '.test';

		callback();

	});

	this.Then(/^all "([^"]*)" will have the same height$/, function (listOfClasses, callback) {
		var selectors = listOfClasses.split(',');
		var self = this,
			expectedHeight = -1,
			promises = [];
		_.each(selectors, function (selector, index) {
			promises.push(
				self.client.getElementSize(selector, 'height').then(function (height) {
					if (expectedHeight === -1) {
						expectedHeight = height;
					} else {
						try {
							self.assert.strictEqual(height, expectedHeight);
						} catch (e) {
							callback(e);
						}
					}
				}));
		});
		q.all(promises).done(function () {
			callback();
		});
	});
};
