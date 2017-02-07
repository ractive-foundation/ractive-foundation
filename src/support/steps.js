/**
 *
 * var steps = require('../../../support/steps.js');
 * steps.call(this);
 *
 */
var _ = require('lodash-compat');
var helper = require('./testHelpers');

module.exports = function () {

	this.Before({tags: ['@desktop']}, function (scenario, callback) {
		return this.client.setViewportSize({
			width: 1280,
			height: 1024
		});
	});

	this.Before({tags: ['@mobile']}, function (scenario, callback) {
		return this.client.setViewportSize({
			width: 320,
			height: 480
		});
	});

	// For testing plugins.
	this.Given(/^I have loaded plugin "([^"]*)" use case "([^"]*)"$/,
		function (plugin, useCase, callback) {
			this.client.loadPluginUseCase(plugin, useCase).then(function () {
				callback();
			});
		});

	// For testing components.
	this.Given(/^I have loaded component "([^"]*)" with use case "([^"]*)"$/,
		function (componentName, useCase, callback) {
			this.client.loadComponentWithUseCase(componentName, useCase).then(callback).catch(callback);
		});

	this.Then(/^there will be an element for "([^"]*)"$/, function (semanticName, callback) {
		var selector = this.component[semanticName];
		this.client.waitForExist(selector, this.defaultTimeout).then(function (success) {
			if (!success) {
				var error = new Error('Failed to wait for element "' + semanticName +
				'" (' + selector + ')');
				callback(error);
			}
			callback();
		}).catch(callback);
	});

	this.Then(/^there will be NO element for "([^"]*)"$/, function (semanticName, callback) {
		this.client.isExisting(this.component[semanticName]).then(function (isExisting) {
			if (isExisting) {
				var error = new Error('Element "' + semanticName + '" exists, Selector: ' +
					this.component[semanticName]);
				callback(error);
			}
			callback();
		}.bind(this)).catch(callback);
	});

	this.Then(/^the element "([^"]*)" will have the class "([^"]*)"$/, function (semanticName, className, callback) {
		if (className === '') {
			callback();
		} else {
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
		}
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
					var error = new Error('Element "' + semanticName +
					'" (' + this.component[semanticName] + ') attribute "' + attribute +
					'" does NOT contain "' + value + '", currently "' + attr + '"');
					callback(error);
				}

			}.bind(this))
			.catch(callback);

		});

	this.Then(/^"([^"]*)" will be visible$/, function (element, callback) {
		this.client.isVisible(this.component[element]).then(function (isVisible) {
			var e = (isVisible) ? void 0 : new Error('Element not visible! Selector: ' + this.component[element]);
			callback(e);
		}.bind(this)).catch(callback);
	});

	this.Then(/^"([^"]*)" will NOT be visible$/, function (element, callback) {
		this.client.isVisible(this.component[element]).then(function (isVisible) {
			var e = (isVisible) ? new Error('Element is visible! Selector: ' + this.component[element]) : void 0;
			callback(e);
		}.bind(this)).catch(callback);
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
		}.bind(this)).catch(callback);
	});

	this.Then(/^there are (\d+) "([^"]*)" elements displayed$/, function (numElements, semanticName, callback) {

		this.client.waitForExist(this.component[semanticName], this.defaultTimeout).then(function () {

			return this.client.elements(this.component[semanticName]);

		}.bind(this)).then(function (elements) {

			try {
				this.assert.equal(elements.value.length, numElements);
				callback();
			} catch (e) {
				callback(e);
			}

		}.bind(this)).catch(callback);

	});

	this.When(/^I click the "([^"]*)" element$/, function (element, callback) {
		this.client.waitForExist(this.component[element], this.defaultTimeout).then(function () {
			return this.client.click(this.component[element]);
		}.bind(this)).then(function () {
			callback();
		}).catch(callback);
	});

	this.Then(/^there should be (\d+) of the element "([^"]+)"/, function (numElements, element, callback) {
		var selector = this.component[element];

		this.client.waitForExist(selector, this.defaultTimeout).then(function () {
			return this.client.elements(selector);
		}.bind(this)).then(function (elements) {
			try {
				this.assert.equal(elements.value.length, numElements);
				callback();
			} catch (e) {
				callback(e);
			}
		}.bind(this)).catch(callback);
	});

	this.When(/^I hover the "([^"]*)" element$/, function (element, callback) {
		var selector = this.component[element];

		this.client.waitForExist(selector, this.defaultTimeout).then(function () {
			return this.client.moveToObject(selector, 0, 0);
		}.bind(this)).then(function () {
			callback();
		}).catch(callback);
	});

};
