module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent';
		this.component.h1 = this.component.container + ' h1';
		this.component.h2 = this.component.container + ' h2';
		this.component.h3 = this.component.container + ' h3';
		this.component.h4 = this.component.container + ' h4';
		this.component.h5 = this.component.container + ' h5';
		this.component.h6 = this.component.container + ' h6';

		callback();
	});
};
