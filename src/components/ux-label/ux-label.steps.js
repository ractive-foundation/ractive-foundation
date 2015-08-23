module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	var component = { container: '#childComponent' };
	component.label = {
		selector: component.container + ' .label',
		attribs: {
			className: 'class'
		}
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

};
