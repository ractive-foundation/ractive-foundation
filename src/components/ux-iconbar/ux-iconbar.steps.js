module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent';
		this.component.iconbar = this.component.container + ' .icon-bar';
		this.component.item = this.component.iconbar + ' .item';
		this.component.firstItem = this.component.item + ':nth-child(1)';
		this.component.firstItemLabel = this.component.firstItem + ' label';
		this.component.thirdItem = this.component.item + ':nth-child(3)';
		this.component.thirdItemLabel = this.component.thirdItem + ' label';
		this.component.fourthItem = this.component.item + ':nth-child(4)';
		callback();
	});

};
