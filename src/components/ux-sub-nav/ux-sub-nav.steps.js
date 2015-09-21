module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '.ux-sub-nav ';
		this.component.items     = this.component.container + 'dd';

		callback();
	});

	this.Given(/^I have loaded component "([^"]*)" with use case "([^"]*)"$/,
		function (componentName, useCase, callback) {
			this.client.loadComponentWithUseCase(componentName, useCase, callback);
	});

	this.Then(/^I should see (\d+) options$/, function (numElements, callback) {

		var selector = this.component.items;

		this.client.waitForExist(selector, this.defaultTimeout).then(function () {

			return this.client.elements(selector);

		}.bind(this)).then(function (elements) {

			try {
				this.assert.equal(elements.value.length, numElements);
				callback();
			} catch(e) {
				callback(e);
			}

		}.bind(this)).catch(function (e){

			callback(e);

		});

	});
};
