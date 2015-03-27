module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent ';

		this.component.button = {
			attribs: {
				role: 'role',
				className: 'class',
				ariaLabel: 'aria-label',
				tabindex: 'tabindex'
			}
		};

		callback();
	});

	this.Given(/^I have loaded component "([^"]*)" with use case "([^"]*)"$/,
		function (componentName, useCase, callback) {
		this.client.loadComponentWithUseCase(componentName, useCase, callback);
	});

	this.Then(/^the element "([^"]*)" should be displayed$/, function (selector, callback) {
		var self = this;
		this.client.isExisting(this.component.container + selector, function (err, isExisting) {
			try {
				self.assert(isExisting);
				callback();
			} catch (e) {
				callback.fail('Assertion failed, element not found');
			}

			callback();
		});
	});

	this.Then(/^the element "([^"]*)" should have the "([^"]*)" of "([^"]*)"$/,
		function (selector, attribName, attribValue, callback) {
		var self = this;
		this.client.getAttribute(this.component.container + selector,
			this.component.button.attribs[attribName],
			function (err, attr) {
				try {
					self.assert.equal(attr, attribValue);
					callback();
				} catch (e) {
					callback.fail('Assertion failed: ' + attr + ' !== ' + attribValue);
				}

			});


	});




};
