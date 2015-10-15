module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent ';
		this.component.table = this.component.container + '.ux-table';
		this.component.column = this.component.container + 'thead th';
		this.component.row = this.component.container + 'tbody tr';

		callback();
	});

};
