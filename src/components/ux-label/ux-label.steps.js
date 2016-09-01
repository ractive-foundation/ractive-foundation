module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (obj, callback) {
		this.component = {};
		this.component.container = '#childComponent ';
		this.component.span = this.component.container + 'span';

		callback();
	});

};
