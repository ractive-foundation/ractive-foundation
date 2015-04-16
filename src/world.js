/**
 * Shared environment for all tests.
 */

var path = require('path');

// @see http://webdriver.io/api.html
var webdriverio = require('webdriverio');

// @see http://nodejs.org/api/assert.html
// Assertion library of choice.
var assert = require('assert');

// WebdriverIO Browser choices.
const BROWSER_PHANTOMJS = 'phantomjs';
const BROWSER_PHANTOMJS_PATH = path.join('node_modules', 'phantomjs', 'bin', 'phantomjs');

const WEBDRIVER_TIMEOUT = 5000;

// TODO The port will inevitably need to be dynamic.
var COMPONENT_BASE_PATH = 'http://localhost:9080/testRunner.html#!/component/$1/use-case/$2';

var WorldConstructor = function WorldConstructor(callback) {

	var options = {
		desiredCapabilities: {
			browserName: BROWSER_PHANTOMJS,
			'phantomjs.binary.path': BROWSER_PHANTOMJS_PATH
		}
	};

	var client = webdriverio.remote(options).init();

	var world = {

		assert: assert,

		client: client,

		defaultTimeout: WEBDRIVER_TIMEOUT

	};

	/**
	 * Common functions that will be used in the suite.
	 */

	client.addCommand('loadComponentWithUseCase', function(componentName, useCase, callback) {
		var url = COMPONENT_BASE_PATH.replace('$1', componentName).replace('$2', useCase);
		return this.url(url, callback);
	});

	callback(world);

};

exports.World = WorldConstructor;
