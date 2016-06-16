module.exports = function () {

	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent ';
		this.component.img = this.component.container + 'img';
		this.component.a   = this.component.container + 'a';

		callback();
	});

};
