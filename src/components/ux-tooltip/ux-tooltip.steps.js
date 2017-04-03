module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (scenario, callback) {

		this.component = {};
		this.component.container = '#childComponent ';
		this.component.link = this.component.container + '.tooltip-container';
		this.component.tooltip = this.component.container + 'span.tooltip';

		callback();

	});

};
