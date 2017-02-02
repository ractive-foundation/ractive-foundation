module.exports = function () {
	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);
	this.Before(function (opts, callback) {
		this.component = {};
		this.component.container = '.ux-button-group';
		this.component.buttonItems = '.ux-button-group .button-group > li';
		this.component.containerA = '.ux-button-group:nth-of-type(1) .button-group';
		this.component.containerB = '.ux-button-group:nth-of-type(2) .button-group';

		if (callback && typeof callback === 'function') {
			callback();
		}
	});
};
