module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (scenario, callback) {
		this.component = {};
		this.component.anchor = '.ux-anchor ';

		callback();
	});
};
