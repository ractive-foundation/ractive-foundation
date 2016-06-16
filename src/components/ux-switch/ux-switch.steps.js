module.exports = function () {

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (callback) {

		this.component = {};
		this.component.container = '.switch ';
		this.component.checkbox = this.component.container + ' input';

		callback();

	});

};
