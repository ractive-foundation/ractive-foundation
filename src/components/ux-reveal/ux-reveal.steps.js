module.exports = function () {

	require('../../support/steps').call(this);

	this.Before(function (callback) {

		this.component = {};
		this.component.container = '.ux-reveal ';

		this.component.openModal = this.component.container  + '.open-reveal-modal ';
		this.component.modalBox = this.component.container  + '.reveal-modal ';
		this.component.closeModal = this.component.container  + '.close-reveal-modal ';

		callback();

	});

};
