module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	// Load shared library of step definitions. Use these first!
	require('../../support/steps').call(this);

	this.Before(function (callback) {

		this.component = {};
		this.component.container = '.ux-pricingtable ';
		this.component.pricing_table = this.component.container + ' .pricing-table';
		this.component.title = this.component.pricing_table + ' .title';
		this.component.price = this.component.pricing_table + ' .price';
		this.component.description = this.component.pricing_table + ' .description';
		this.component.button = this.component.pricing_table + ' .cta-button';
		this.component.bullet = this.component.pricing_table + ' .bullet-item';

		callback();

	});

};
