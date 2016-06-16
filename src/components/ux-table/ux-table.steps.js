/*global browser */
module.exports = function () {

	// Load standard world object to be 'this' in steps.
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent';
		this.component.table = this.component.container + ' .ux-table';
		this.component.column = this.component.container + ' thead th';
		this.component.row = this.component.container + ' tbody tr';

		callback();
	});

	/*
	 * This is here because the similar assertion inside steps.js does not accept the numElements value provided by the
	 * 'Example' structure in ux-table.feature.
	 */
	this.Given(/^there are "([^"]*)" "([^"]*)" elements displayed$/, function (numElements, semanticName, callback) {
		browser.waitForExist(this.component[semanticName], 5000).then(function () {
			return browser.elements(this.component[semanticName]);
		}.bind(this)).then(function (elements) {
			try {
				this.assert.equal(elements.value.length, numElements);
				callback();
			} catch (e) {
				callback(e);
			}
		}.bind(this)).catch(callback);
	});


};
