module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	var component = { container: '#childComponent' };
		component.div = {
			selector: component.container + ' div',
			attribs: { className: 'class' }
		};


	this.Given(/^I have loaded component "([^"]*)" with use case "([^"]*)"$/,
		function (componentName, useCase, callback) {
			this.client.loadComponentWithUseCase(componentName, useCase, callback);
	});

	this.Then(/^the element "([^"]*)" should be displayed$/, function (semanticName, callback) {
		var self = this;
		this.client.isExisting(component[semanticName].selector, function (err, isExisting) {
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
			component[semanticName].selector,
			component[semanticName].attribs[attribName],
			function (err, attr) {
				try {
					self.assert.deepEqual(attr, attribValue);
					callback();
				} catch (e) {
					callback.fail(e.name + ' ' + e.message);
				}
			}
		);
	});
};
