module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (scenario, callback) {
		this.component = {};
		this.component.container = '#childComponent ';

		this.component.topBar = this.component.container + ' .ux-top-bar ';
		this.component.title = this.component.topBar + ' .title-area .name';

		this.component.leftLevel1 = this.component.topBar + ' .top-bar-section .left>li';

		this.component.rightLevel1 = this.component.topBar + ' .top-bar-section .right>li';
		this.component.rightLevel2 = this.component.rightLevel1 + '>ul>li';
		this.component.rightLevel3 = this.component.rightLevel2 + '>ul>li';

		callback();
	});

};
