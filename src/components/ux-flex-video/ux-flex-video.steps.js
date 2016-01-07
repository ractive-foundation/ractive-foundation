module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (callback) {

		this.component = {};
		this.component.container = '.ux-flex-video ';
		this.component.iframe = this.component.container + 'iframe';
		this.component.flexvideo = this.component.container + '.flex-video';

		callback();

	});

};
