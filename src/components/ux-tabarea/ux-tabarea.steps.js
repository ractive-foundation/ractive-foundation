module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent ';
		this.component.tabs = this.component.container + 'ul';
		this.component.tabsContent = this.component.container + '.tabs-content';

		this.component.firstTab = this.component.tabs + ' li:nth-child(1)';
		this.component.firstTabContent = this.component.tabsContent + ' section:nth-child(1)';

		this.component.secondTab = this.component.tabs + ' li:nth-child(2)';
		this.component.secondTabLink = this.component.secondTab + ' a';
		this.component.secondTabContent = this.component.tabsContent + ' section:nth-child(2)';

		this.component.thirdTab = this.component.tabs + ' li:nth-child(3)';


		callback();
	});

	this.Given(/^I have loaded component "([^"]*)" with use case "([^"]*)"$/,
		function (componentName, useCase, callback) {
			this.client.loadComponentWithUseCase(componentName, useCase, callback);
	});

	/*
	this.Then(/^the element "([^"]*)" should contain "([^"]*)" that reads "([^"]*)"$/,
		function (occurence, selector, text, callback) {

			var tab = this.component.tabs + ' li:nth-child(' + occurence + ')',
				element = tab + ' ' + selector;

			this.client.waitForExist(element, this.defaultTimeout).then(function () {
				return this.client.getText(element);
			}.bind(this))
			.then(function (elemText) {
				try {
					// If elem has nested tags, it will return array.
					if (_.isArray(elemText)) {
						this.assert.notEqual(_.indexOf(elemText, text), -1);
					} else {
						this.assert.equal(text, elemText);
					}
					callback();
				} catch (e) {
					callback(e);
				}
			}.bind(this));
	});
	*/
};
