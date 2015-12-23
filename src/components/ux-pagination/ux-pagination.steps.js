module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent .pagination ';
		this.component.current_1 = this.component.container + '.page-1.current';
		this.component.current_2 = this.component.container + '.page-2.current';
		this.component.current_5 = this.component.container + '.page-5.current';

		callback();
	});

	this.Then(/^the current page is "([^"]*)"$/, function (page, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^there are "([^"]*)" elements displayed$/, function (number, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Given(/^pages visible are "([^"]*)"$/, function (visible, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

};
