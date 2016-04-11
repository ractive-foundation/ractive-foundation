module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../support/world').World;

	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#component ';

		callback();
	});

};
