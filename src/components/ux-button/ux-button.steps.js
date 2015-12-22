module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (callback) {

		this.component = {};
		this.component.container = '#childComponent ';
		this.component.button = this.component.container + ' button.button';
		this.component.anchor = this.component.container + ' a.button';

		callback();

	});

};
