module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (scenario, callback) {

		this.component = {};
		this.component.container = '#childComponent ';
		this.component.startLink = '.right-point1';
		this.component.joyrideContainer = '.joyride-content-wrapper';
		this.component.closeElement = '.joyride-close-tip';
		this.component.prevButton = '.prev';
		this.component.nextButton = '.next';

		callback();

	});

};
