module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent';
		this.component.iconbar = this.component.container + ' .icon-bar';
		this.component.item = this.component.iconbar + ' .item';
		this.component.secondItem = this.component.item + ':nth-child(2)';
		this.component.secondItemLabel = this.component.secondItem + ' label';
		this.component.thirdItem = this.component.item + ':nth-child(3)';
		this.component.thirdItemLabel = this.component.thirdItem + ' label';
		this.component.fourthItem = this.component.item + ':nth-child(4)';
		callback();
	});

};
