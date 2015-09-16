module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	var component = { container: '#childComponent' };
	component.alert = {
		selector: component.container + ' div',
		attribs: { className: 'class' }
		};
	
	this.Before(function (callback) {
		this.component = {};
		this.component.cross = '.close';

		callback();

	});

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

	this.When(/^I click "([^"]*)"$/, function (element, callback) {
		this.client.waitForExist(this.component.cross, this.defaultTimeout).then(function () {
			return this.client.click(this.component.cross);
		}.bind(this)).then(function () {
			callback();
		}).catch(callback);
	});

	this.Then(/^"([^"]*)" will NOT be visible$/, function (element, callback) {
		this.client.isVisible(component[element].selector).then(function (isVisible) {
			var e = (isVisible) ? new Error('Element is visible! Selector: ' + this.component.cross) : void 0;
			callback(e);
		}.bind(this)).catch(callback);
	});
};
