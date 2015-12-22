module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (callback) {

		this.component = {};
		this.component.container = '#childComponent ';
		this.component.button = this.component.container + ' button.button';
		this.component.anchor = this.component.container + ' a.button';

		callback();

	});

	this.Then(/^the element "([^"]*)" should be displayed$/, function (semanticName, callback) {

		var self = this;
		this.client.isExisting(this.component[semanticName], function (err, isExisting) {
			try {
				self.assert(isExisting);
				callback();
			} catch (e) {
				callback.fail('Assertion failed, element not found');
			}
		});
	});

	this.Then(/^the element "([^"]*)" should have the "([^"]*)" of "([^"]*)"$/,
		function (semanticName, attribName, attribValue, callback) {

			var self = this;

			this.client.getAttribute(
				this.component[semanticName].selector,
				this.component[semanticName + 'Attribs'][attribName],
				function (err, attr) {
					try {
						console.log(self);
						self.assert.deepEqual(attr, attribValue);
						callback();
					} catch (e) {
						callback.fail(e);
					}
				}
			);
		}
	);
};
