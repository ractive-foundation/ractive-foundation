module.exports = function () {

	var _ = require('lodash-compat');

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container   = '#childComponent ';
		this.component.breadcrumbs = this.component.container + 'li';
		this.component.second      = this.component.container + 'li + li';
		this.component.third       = this.component.container + 'li + li + li';
		this.component.fourth      = this.component.container + 'li + li + li + li';

		callback();
	});

	this.Then(/^I should see (\d+) breadcrumbs$/, function (count, callback) {
		var selector = this.component.breadcrumbs;

		this.client.waitForExist(selector, 1000).then(function () {
			return this.client.elements(selector);
		}.bind(this)).then(function (elements) {
			try {
				this.assert.equal(elements.value.length, count);
				callback();
			} catch (e) {
				callback(e);
			}
		}.bind(this)).catch(function (e) {
			callback(e);
		});
	});

	this.Then(/^the "([^"]*)" breadcrumb should be "([^"]*)"$/, function (element, className, callback) {
		var selector = this.component[element];
		this.client.waitForExist(selector, this.defaultTimeout).then(function () {
			return this.client.getAttribute(selector, 'class');
		}.bind(this))
			.then(function (attr) {
				try {
					if (!(attr instanceof Array)) {
						attr = attr.split(/\s+/);
					}
					var classList = _.find(attr, function (item) {
						return item === className;
					});
					this.assert.equal(_.indexOf(classList, className), -1);
					callback();
				} catch (e) {
					callback(e);
				}
			}.bind(this))
			.catch(callback);
	});

};
