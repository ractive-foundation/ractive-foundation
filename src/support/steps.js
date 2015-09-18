/**
 *
 * var steps = require('../../../support/steps.js');
 * steps.call(this);
 *
 */
var _ = require('lodash-compat');
var helper = require('./testHelpers');

module.exports = function () {

	this.Before('@desktop', function (callback) {

		this.client.setViewportSize({
			width: 1280,
			height: 1024
		}).then(function () {
			callback();
		});

	});

	this.Before('@mobile', function (callback) {

		this.client.setViewportSize({
			width: 320,
			height: 480
		}).then(function () {
			callback();
		});

	});

	// For testing components.
	this.Given(/^I have loaded component "([^"]*)" with use case "([^"]*)"$/,
		function (componentName, useCase, callback) {
			this.client.loadComponentWithUseCase(componentName, useCase).then(function () {
				callback();
			});
	});

	this.Then(/^there will be an element for "([^"]*)"$/, function (semanticName, callback) {
		this.client.waitForExist(this.component[semanticName], this.defaultTimeout, function (whatIsThisArg, success) {
			if (!success) {
				callback.fail('Failed to wait for element "' + semanticName + '" (' + this.component[semanticName] + ')');
			}
			callback();
		});
	});

	this.Then(/^there will be NO element for "([^"]*)"$/, function (semanticName, callback) {
		this.client.isExisting(this.component[semanticName]).then(function (isExisting) {
			if (isExisting) { 
				callback.fail('Element "' + semanticName + '" exists, Selector:', this.component[semanticName]);
			}
			callback();
		}.bind(this));
	});

	this.Then(/^the element "([^"]*)" will have the class "([^"]*)"$/, function (semanticName, className, callback) {
		this.client.waitForExist(this.component[semanticName], this.defaultTimeout).then(function () {
			return this.client.getAttribute(this.component[semanticName], 'class');
		}.bind(this))
			.then(function (attr) {
				try {
					var classList = helper.flattenClassList(attr);
					this.assert.notEqual(_.indexOf(classList, className), -1);
					callback();
				} catch (e) {
					callback(e);
				}
			}.bind(this))
			.catch(callback);
	});

	this.Then(/^the element "([^"]*)" will NOT have the class "([^"]*)"$/, function (semanticName, className, callback) {
		this.client.waitForExist(this.component[semanticName], this.defaultTimeout).then(function () {
			return this.client.getAttribute(this.component[semanticName], 'class');
		}.bind(this))
			.then(function (attr) {
				try {
					var classList = helper.flattenClassList(attr);
					this.assert.equal(_.indexOf(classList, className), -1);
					callback();
				} catch (e) {
					callback(e);
				}
			}.bind(this))
			.catch(callback);
	});

	this.Then(/^the element "([^"]*)" should have attribute "([^"]*)" containing "([^"]*)"$/, 
		function (semanticName, attribute, value, callback) {

		this.client.waitForExist(this.component[semanticName], this.defaultTimeout).then(function () {

			return this.client.getAttribute(this.component[semanticName], attribute);

		}.bind(this)).then(function (attr) {

			try {
				this.assert.notEqual(attr.indexOf(value), -1);
				callback();
			} catch (e) {
				callback.fail('Element "' + semanticName + '" (' + this.component[semanticName] + ') attribute "' + attribute + 
					'" does NOT contain "' + value + '", currently "' + attr + '"');
			}

		}.bind(this))
		.catch(callback);

	});

	this.Then(/^"([^"]*)" will be visible$/, function (element, callback) {
		this.client.isVisible(this.component[element]).then(function (isVisible) {
			var e = (isVisible) ? void 0 : new Error('Element not visible! Selector: ' + this.component[element]);
			callback(e);
		}).catch(callback);
	});

	this.Then(/^"([^"]*)" will NOT be visible$/, function (element, callback) {
		this.client.isVisible(this.component[element]).then(function (isVisible) {
			var e = (isVisible) ? new Error('Element is visible! Selector: ' + this.component[element]) : void 0;
			callback(e);
		}).catch(callback);
	});

	this.Then(/^the element "([^"]*)" should have the text "([^"]*)"$/, function (element, text, callback) {
		this.client.waitForExist(this.component[element], this.defaultTimeout).then(function () {
			return this.client.getText(this.component[element]);
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

	this.Then(/^there are (\d+) "([^"]*)" elements displayed$/, function (numElements, semanticName, callback) {

		this.client.waitForExist(this.component[semanticName], this.defaultTimeout).then(function () {

			return this.client.elements(this.component[semanticName]);

		}.bind(this)).then(function (elements) {

			try {
				this.assert.equal(elements.value.length, numElements);
				callback();
			} catch(e) {
				callback(e);
			}

		}.bind(this)).catch(function (e){

			callback(e);

		});

	});

	this.When(/^I click "([^"]*)"$/, function (element, callback) {
		this.client.waitForExist(this.component[element], this.defaultTimeout).then(function () {
			return this.client.click(this.component[element]);
		}.bind(this)).then(function () {
			callback();
		}).catch(callback);
	});

};
