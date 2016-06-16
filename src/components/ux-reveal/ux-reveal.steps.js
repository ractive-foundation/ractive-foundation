module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (scenario, callback) {

		this.component = {};
		this.component.container = '.ux-reveal ';

		this.component.openModal = this.component.container  + '.open-reveal-modal ';
		this.component.modalBox = this.component.container  + '.reveal-modal ';
		this.component.closeModal = this.component.container  + '.close-reveal-modal ';

		callback();

	});

};
