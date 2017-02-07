module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (scenario, callback) {
		this.component = {};
		this.component.container = 'ul.accordion';
		this.component.item1 = this.component.container + ':nth-child(1) ';
		this.component.item2 = this.component.container + ':nth-child(2) ';
		this.component.item3 = this.component.container + ':nth-child(3) ';
		this.component.content1 = this.component.item1 + '.content';
		this.component.content2 = this.component.item2 + '.content';
		this.component.content3 = this.component.item3 + '.content';

		callback();

	});

};
