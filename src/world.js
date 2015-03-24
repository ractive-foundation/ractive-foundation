/**
 * Shared environment for all tests.
 */
var webdriverio = require('webdriverio');
var selenium = require('selenium-standalone');

// @see http://nodejs.org/api/assert.html
var assert = require('assert');

var fs = require('fs');
//var port = parseInt(fs.readFileSync('port.http'));

const BROWSER_PHANTOMJS = 'phantomjs';
const BROWSER_CHROME = 'chrome';
const BROWSER_FIREFOX = 'firefox';

const WEBDRIVER_TIMEOUT = 5000;

var COMPONENT_BASE_PATH = 'http://localhost:9080/test.html#component/';

var WorldConstructor = function WorldConstructor(callback) {

	var options = {
		desiredCapabilities: {
			browserName: BROWSER_PHANTOMJS
		},
		logLevel: 'silent'
	};

	var server = selenium.start({ stdio: 'pipe' }, function (err, child) {
		// TODO Possibly remove these later? Do we even want to print these?
		// Selenium requires a callback.
		child.stderr.on('data', function(data){
			console.log(data.toString());
		});
		child.stdout.on('data', function (data) {
			console.log(data.toString());
		});
	});


	var client = webdriverio.remote(options).init();

	client.addCommand('loadComponent', function(componentName, callback) {
		this.url([COMPONENT_BASE_PATH, componentName].join(''), callback);
	});

	var world = {

		assert: assert,

		client: client,

		server: server,

		defaultTimeout: WEBDRIVER_TIMEOUT

	};

	callback(world);

};

exports.World = WorldConstructor;
