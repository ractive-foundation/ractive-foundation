module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (scenario, callback) {
		this.component = {};
		this.component.container = '#childComponent .pagination ';
		this.component.current_1 = this.component.container + '.page-1.current';
		this.component.current_2 = this.component.container + '.page-2.current';
		this.component.current_5 = this.component.container + '.page-5.current';

		this.component.activePage = this.component.container + ' li.current a';
		this.component.paginationItems = this.component.container + ' li';

		callback();
	});

};
