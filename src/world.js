/**
 * Shared environment for all tests.
 */

// var path = require('path');

// @see http://webdriver.io/api.html
var webdriverio = require('webdriverio'),

// @see http://nodejs.org/api/assert.html
// Assertion library of choice.
	assert = require('assert');

// WebdriverIO Browser choices.
const BROWSER_PHANTOMJS = 'phantomjs',
// const BROWSER_PHANTOMJS_PATH = path.join('node_modules', 'phantomjs', 'bin', 'phantomjs');

	WEBDRIVER_TIMEOUT = 5000;
/* jscs: disable */
// TODO The port will inevitably need to be dynamic.
var COMPONENT_BASE_PATH = 'http://localhost:8088/testRunner.html#!/component/$1/use-case/$2',
	PLUGIN_BASE_PATH = 'http://localhost:8088/testRunner.html#!/plugin/$1/use-case/$2';
/* jscs: enable */

var options = {
	desiredCapabilities: {
		browserName: BROWSER_PHANTOMJS
		// 'phantomjs.binary.path': BROWSER_PHANTOMJS_PATH
	}
};
var client = webdriverio.remote(options).init();

/**
 * Common functions that will be used in the suite.
 */

client.addCommand('loadComponentWithUseCase', function (componentName, useCase, callback) {
	var url = COMPONENT_BASE_PATH.replace('$1', componentName).replace('$2', useCase);
	console.log('url:', url);
	return this.url(url, callback);
});

client.addCommand('loadPluginUseCase', function (pluginName, useCase, callback) {
	var url = PLUGIN_BASE_PATH.replace('$1', pluginName).replace('$2', useCase);
	console.log('url:', url);
	return this.url(url, callback);
});

var WorldConstructor = function WorldConstructor(callback) {

	var world = {
		assert: assert,
		client: client,
		defaultTimeout: WEBDRIVER_TIMEOUT
	};

	client.then(function () {
		callback(world);
	});

};

exports.World = WorldConstructor;
