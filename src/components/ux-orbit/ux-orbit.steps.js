module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent ';
		this.component.bullets = this.component.container + '.orbit-bullets';

		callback();
	});

	this.Given(/^I have loaded component "([^"]*)" with use case "([^"]*)"$/,
		function (componentName, useCase, callback) {
			this.client.loadComponentWithUseCase(componentName, useCase, callback);
	});

	this.Then(/^I should see (\d+) slides$/, function (numElements, callback) {
		var selector = this.component.bullets + ' li';

		this.client.waitForExist(selector, 500).then(function () {
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
