module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent ';
		this.component.buttongroup = this.component.container + ' .button-group';
		this.component.li = this.component.buttongroup + ' li:first-child';
		this.component.buttons = this.component.buttongroup + ' a';
		callback();
	});
};
