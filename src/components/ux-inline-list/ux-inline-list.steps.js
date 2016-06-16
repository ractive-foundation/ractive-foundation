module.exports = function () {

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (callback) {

		this.component = {};
		this.component.container = '#childComponent ';
		this.component.list = this.component.container + '.ux-inline-list';
		this.component.item = this.component.list + ' li';

		callback();

	});

};
