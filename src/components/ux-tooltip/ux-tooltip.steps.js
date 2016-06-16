module.exports = function () {

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (callback) {

		this.component = {};
		this.component.container = '#childComponent ';
		this.component.link = this.component.container + ' span';
		this.component.tooltip = this.component.link + ' .tooltip';

		callback();

	});

};
