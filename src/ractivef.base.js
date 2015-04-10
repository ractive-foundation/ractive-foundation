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

			});

		}
		var instance = new Ractive({
			el: container,
			template: Ractive.parse(container.innerHTML),
			components: RactiveF.components,
			onrender: function () {
				this.el.classList.remove('hide');
				this.el.classList.add('initialize');
			}
		});

		instance.on('*.*', function (origin) {

			// list of events below copied from Ractive source code v0.7.1
			// Filtering out ractive lifecycle events to not pollute log output.
			var reservedEventNames =
			/^(?:change|complete|reset|teardown|update|construct|config|init|render|unrender|detach|insert)$/;

			if (!reservedEventNames.test(this.event.name)) {
				console.log('Event', this.event.name);
				console.log('Event handler arguments', origin);

				var eventName = 'events.' + origin.get('uid');
				if (!this.get(eventName)) {
					this.set(eventName, []);
				}
				this.push(eventName, this.event.name);
			}

		});

		instance.set('dataModel', '{{dataModel}}');

		return instance;
	}
};