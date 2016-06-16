module.exports = function () {

	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent ';
		this.component.sideNav = this.component.container + ' .side-nav';

		callback();
	});

};
