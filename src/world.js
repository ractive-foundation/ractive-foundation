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

	WEBDRIVER_TIMEOUT = 3000;
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
console.log('options', options);

var client = webdriverio.remote(options).init().then(function () {
	// Ensure the promise resolves empty. Cucumber tries to read the resolution ouput
	// It expects a string, `init()` returns a promise state object.
	return Promise.resolve();
});

/**
 * Common functions that will be used in the suite.
 */

client.addCommand('loadComponentWithUseCase', function (componentName, useCase, callback) {
	var url = COMPONENT_BASE_PATH.replace('$1', componentName).replace('$2', useCase);
	console.log('url:', url);
	this.url(url).then(function () {
		callback();
	});
});

client.addCommand('loadPluginUseCase', function (pluginName, useCase, callback) {
	var url = PLUGIN_BASE_PATH.replace('$1', pluginName).replace('$2', useCase);
	console.log('url:', url);
	this.url(url).then(function () {
		callback();
	});
});

function World() {
	this.client = client;
	this.assert = assert;
	this.defaultTimeout = WEBDRIVER_TIMEOUT;
	this.options = options;
}

exports.World = World;
