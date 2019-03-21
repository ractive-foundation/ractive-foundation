/*
 * When working with nested components we only want to find child
 * components, not all decendants.
 * @param name
 */
Ractive.defaults.findAllChildComponents = function (name) {
	return _.filter(this.findAllComponents(name), function (component) {
		return this._guid === component.parent._guid;
	}.bind(this));
};

/**
 * If we have a "datamodel" property, that should override any other data.
 * This is now a "data-driven" component.
 * isDataModel is a flag for hbs logic, on whether to use datamodel data or call {{yield}}.
 * @see http://docs.ractivejs.org/latest/ractive-reset
 *
 * TODO Understand the difference between rendering components off the page vs nested inside others.
 * onconstruct has empty opts for the latter.
 */
Ractive.defaults.onconstruct = function (opts) {
	if (opts.data && opts.data.datamodel) {
		if (typeof opts.data.datamodel === 'string') {
			try {
				var newModel = opts.data.datamodel.replace(/&#(\d+);/g, function (match, dec) {
					return String.fromCharCode(dec);
				}).replace(/&quot;/g, '"');
				opts.data.datamodel = JSON.parse(newModel);
			} catch (e) {}
		}
		var datamodel = _.cloneDeep(opts.data.datamodel);
		datamodel.isDataModel = true;
		opts.data = _.assign(opts.data, datamodel);
		delete opts.data.datamodel;
	}
};

/**
 * For any data-driven component - if something sets 'datamodel', lift that into root scope.
 */
Ractive.defaults.onrender = function () {

	// Wait for parent component to set "datamodel" and then map that back into data again.
	this.observe('datamodel', function (newDataModel) {
		if (newDataModel) {
			// Lift datamodel data into root data scope.
			this.set(newDataModel);
		}
	});

};

/**
 * Get the current coordinates of the given element, relative to the document.
 *
 * Useful for viewport checks etc
 *
 * Use Ractive's this.find(selector) to pass that element in.
 *
 * Helper function for cross-browser element offset.
 * window.pageYOffset is not supported below IE 9.
 */
Ractive.defaults.elementOffset = function (elem) {

	// Defensive code for isomorphic execution.
	if (typeof document === 'undefined' || typeof window === 'undefined') {
		return {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		};
	}

	var box = elem.getBoundingClientRect();

	var body = document.body;
	var docEl = document.documentElement;
	var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	var clientTop = docEl.clientTop || body.clientTop || 0;

	var top = box.top + (scrollTop - clientTop);
	var pageXOffset = window.pageXOffset || document.documentElement.scrollLeft;

	return {
		top: Math.round(top),
		right: Math.round(box.right + pageXOffset),
		bottom: Math.round(box.bottom + top),
		left: Math.round(box.left + pageXOffset)
	};

};

/**
 * IE8 friendly function.
 * TODO Make the return object the same as offset?
 */
Ractive.defaults.pageYOffset = function () {
	// Defensive code for isomorphic execution.
	if (typeof document === 'undefined' || typeof window === 'undefined') {
		return 0;
	}
	return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
};

Ractive.defaults.templates = {};
