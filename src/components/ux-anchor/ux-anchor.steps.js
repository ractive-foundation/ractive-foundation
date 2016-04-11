module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../support/world').World;

	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#component ';

		callback();
	});

	this.Given(/^I have loaded component "([^"]*)" with use case "([^"]*)"$/,
		function (componentName, useCase, callback) {
			this.client.loadComponentWithUseCase(componentName, useCase).then(function () {
				callback();
			});
	});

	this.Then(/^I should see the "([^"]*)" element$/, function (element, callback) {
		this.client.waitForExist(this.component[element], this.defaultTimeout, function (err, exist) {
			if (!exist) {
				callback(new Error('Selector "' + this.component[element] + '" not found'));
				return;
			}

			callback(err);
		});
	});

};
