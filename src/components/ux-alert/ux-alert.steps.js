module.exports = function () {

	// Load standard world object to be 'this' in steps.
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container	= '#childComponent';
		this.component.cross		= this.component.container + ' .close';
		this.component.alertBox		= this.component.container + ' .alert-box';
		callback();
	});
};
