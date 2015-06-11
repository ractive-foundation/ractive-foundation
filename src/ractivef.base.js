RactiveF = {
	components: {},
	templates: {},
	widgets: [],
	forge: function (options) {
		options = options || {};
		var Instance = Ractive.extend(this);
		return new Instance(options);
	},
	initInstance: function (el, options) {
		el = typeof el === 'string' ? document.querySelector(el) : el;

		options = options || {};

		var defaults = {
			el: el,
			template: Ractive.parse(el.innerHTML),
			onrender: function () {
				this.el.classList.remove('hide');
				this.el.classList.add('initialize');
			}
		};

		options = _.extend(defaults, options);

		return this.forge(options);
	},

	/*
	 * When working with nested components we only want to find child
	 * components, not all decendants.
	 * @param name
	 */
	findAllChildComponents: function (name) {
		return _.filter(this.findAllComponents(name), function (component) {
			return this._guid === component.parent._guid;
		}.bind(this));
	},

	/**
	 * If we have a "datamodel" property, that should override any other data.
	 * This is now a "data-driven" component.
	 * isDataModel is a flag for hbs logic, on whether to use datamodel data or call {{yield}}.
	 * @see http://docs.ractivejs.org/latest/ractive-reset
	 *
	 * TODO Understand the difference between rendering components off the page vs nested inside others.
	 * onconstruct has empty opts for the latter.
	 */
	onconstruct: function (opts) {
		if (opts.data && opts.data.datamodel) {
			var datamodel = _.cloneDeep(opts.data.datamodel);
			datamodel.isDataModel = true;
			opts.data = _.assign(opts.data, datamodel);
			delete opts.data.datamodel;
		}
	},

	/**
	 * For any data-driven component - if something sets 'datamodel', lift that into root scope.
	 */
	onrender: function () {

		// Wait for parent component to set "datamodel" and then map that back into data again.
		this.observe('datamodel', function (newDataModel) {
			if (newDataModel) {
				// Lift datamodel data into root data scope.
				this.set(newDataModel);
			}
		});

	}


};
