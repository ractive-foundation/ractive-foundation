module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (obj, callback) {
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
		}
	);
};
