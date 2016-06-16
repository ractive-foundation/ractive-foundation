module.exports = function () {

	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent ';

		this.component.offCanvas = this.component.container + ' .off-canvas-wrap';
		this.component.leftMenu = this.component.offCanvas + ' .left-off-canvas-menu';
		this.component.rightMenu = this.component.offCanvas + ' .right-off-canvas-menu';

		this.component.leftMenuButton = this.component.offCanvas + ' .left-off-canvas-toggle';
		this.component.rightMenuButton = this.component.offCanvas + ' .right-off-canvas-toggle';
		this.component.exitButton = this.component.offCanvas + ' .exit-off-canvas';

		callback();
	});

};
