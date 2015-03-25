RactiveF = {
	components: {},
	templates: {},
	widgets: [],
	initInstance: function (container) {

		// Have we mixed in extensions to all instances yet?
		if (!Ractive.prototype.findAllChildComponents) {

			// FIXME: Is there any other way to do it? Without using lodash dependency.
			_.mixin(Ractive.prototype, {
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
				 * Check to see if we have a data-driven component. 
				 * If so, map the (parsed) datamodel data to the root-level "data" prop.
				 * 
				 * @param  {Object} opts RactiveJS init params for this component.
				 */
				onconstruct: function (opts) {
					if (opts.data && opts.data.datamodel) {
						// datamodel is the new data.
						opts.data = opts.data.datamodel;
						// Set a flag, just in case.
						opts.data.isDataModel = true;
					}
				}

			});

		}

		return new Ractive({
			el: container,
			template: Ractive.parse(container.innerHTML),
			components: RactiveF.components,
			onrender: function () {
				this.el.classList.remove('hide');
				this.el.classList.add('initialize');
			}
		});
	}
};

if (typeof document !== 'undefined') {
	document.addEventListener('DOMContentLoaded', function () {
		var containers = document.querySelectorAll('.ractivef');
		for (var i = 0; i < containers.length; i++) {
			var instance = RactiveF.initInstance(containers[i]);
			RactiveF.widgets.push(instance);
		}
	});
}