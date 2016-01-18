module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (callback) {

		this.component = {};
		this.component.container = '.switch ';
		this.component.checkbox = this.component.container + ' input';

		callback();

	});

};
