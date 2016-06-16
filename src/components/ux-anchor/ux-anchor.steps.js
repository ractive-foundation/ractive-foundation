module.exports = function () {

	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.anchor = '.ux-anchor ';

		callback();
	});
};
