module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent ';

		callback();
	});

	this.Given(/^I have loaded component "([^"]*)" with use case "([^"]*)"$/,
		function (componentName, useCase, callback) {
			this.client.loadComponentWithUseCase(componentName, useCase, callback);
	});

};
