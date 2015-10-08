module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent';
		this.component.progress = this.component.container + ' .progress';
		callback();
	});

	this.Then(/^the element "([^"]*)" should be displayed$/, function (semanticName, callback) {

		var self = this;
		this.client.isExisting(this.component[semanticName]).then(function (isExisting) {
			try {
				self.assert(isExisting);
				callback();
			} catch (e) {
				callback.fail('Assertion failed, element not found');
			}
		}).catch(callback);
	});

};
