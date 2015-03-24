module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world.js').World;

	this.Given(/^I have loaded "([^"]*)" component$/, function (componentName, callback) {
		this.client.loadComponent(componentName, callback);
	});

};
