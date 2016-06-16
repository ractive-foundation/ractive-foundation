/*global browser*/
/**
 *
 * var steps = require('../../../support/steps.js');
 * steps.call(this);
 *
 */
var _ = require('lodash-compat');
var helper = require('./testHelpers');

const DEFAULT_TIMEOUT = 5000;

var COMPONENT_BASE_PATH = 'http://localhost:8088/testRunner.html#!/component/$1/use-case/$2';
//var PLUGIN_BASE_PATH = 'http://localhost:8088/testRunner.html#!/plugin/$1/use-case/$2';

module.exports = function () {

	/*this.Before('@desktop', function (callback) {

		browser.setViewportSize({
			width: 1280,
			height: 1024
		}).then(callback);

	});

	this.Before('@mobile', function (callback) {

		browser.setViewportSize({
			width: 320,
			height: 480
		}).then(callback);

	});*/

	// For testing plugins.
	this.Given(/^I have loaded plugin "([^"]*)" use case "([^"]*)"$/,
		function (plugin, useCase, callback) {
			browser.loadPluginUseCase(plugin, useCase).then(function () {
				callback();
			});
		});

	// For testing components.
	this.Given(/^I have loaded component "([^"]*)" with use case "([^"]*)"$/,
		function (componentName, useCase, callback) {
			var url = COMPONENT_BASE_PATH.replace('$1', componentName).replace('$2', useCase);
			browser.url(url).then(callback);
		});

	this.Then(/^there will be an element for "([^"]*)"$/, function (semanticName, callback) {
		var selector = this.component[semanticName];
		return browser.waitForExist(selector, DEFAULT_TIMEOUT).then(function (success) {
			if (!success) {
				callback('Failed to wait for element "' + semanticName +
					'" (' + selector + ')');
			}
			callback();
		}).catch(callback);
	});

	this.Then(/^there will be NO element for "([^"]*)"$/, function (semanticName, callback) {
		browser.isExisting(this.component[semanticName]).then(function (isExisting) {
			if (isExisting) {
				callback.fail('Element "' + semanticName + '" exists, Selector:', this.component[semanticName]);
			}
			callback();
		}.bind(this)).catch(callback);
	});

	this.Then(/^the element "([^"]*)" will have the class "([^"]*)"$/, function (semanticName, className, callback) {
		if (className === '') {
			callback();
		} else {
			browser.waitForExist(this.component[semanticName], DEFAULT_TIMEOUT).then(function () {
				return browser.getAttribute(this.component[semanticName], 'class');
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
		browser.waitForExist(this.component[semanticName], DEFAULT_TIMEOUT).then(function () {
			return browser.getAttribute(this.component[semanticName], 'class');
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

			browser.waitForExist(this.component[semanticName], DEFAULT_TIMEOUT).then(function () {

				return browser.getAttribute(this.component[semanticName], attribute);

			}.bind(this)).then(function (attr) {

				try {
					this.assert.notEqual(attr.indexOf(value), -1);
					callback();
				} catch (e) {
					callback.fail('Element "' + semanticName +
						'" (' + this.component[semanticName] + ') attribute "' + attribute +
						'" does NOT contain "' + value + '", currently "' + attr + '"');
				}

			}.bind(this))
			.catch(callback);

		});

	this.Then(/^"([^"]*)" will be visible$/, function (element, callback) {
		console.log('IS VISIBLE CALL');
		browser.isVisible(this.component[element]).then(function (isVisible) {
			console.log('IS visible', isVisible);
			var e = (isVisible) ? void 0 : new Error('Element not visible! Selector: ' + this.component[element]);
			callback(e);
		}).catch(callback);
	});

	this.Then(/^"([^"]*)" will NOT be visible$/, function (element, callback) {
		browser.isVisible(this.component[element]).then(function (isVisible) {
			var e = (isVisible) ? new Error('Element is visible! Selector: ' + this.component[element]) : void 0;
			callback(e);
		}.bind(this)).catch(callback);
	});

	this.Then(/^the element "([^"]*)" should have the text "([^"]*)"$/, function (element, text, callback) {
		browser.waitForExist(this.component[element], DEFAULT_TIMEOUT).then(function () {
			return browser.getText(this.component[element]);
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

		browser.waitForExist(this.component[semanticName], DEFAULT_TIMEOUT).then(function () {

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

	this.When(/^I click the "([^"]*)" element$/, function (element, callback) {
		console.log('component', this.component[element]);
		console.log('defaultTimeout', DEFAULT_TIMEOUT);
		browser.waitForExist(this.component[element], DEFAULT_TIMEOUT).then(function () {
			return browser.click(this.component[element]);
		}.bind(this)).then(callback).catch(callback);
	});

	this.Then(/^there should be (\d+) of the element "([^"]+)"/, function (numElements, element, callback) {
		var selector = this.component[element];

		browser.waitForExist(selector, 500).then(function () {
			return browser.elements(selector);
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

		browser.waitForExist(selector, DEFAULT_TIMEOUT).then(function () {
			return browser.moveToObject(selector, 0, 0);
		}.bind(this)).then(function () {
			callback();
		}).catch(callback);
	});

};
