RactiveF = {
	components: {},
	templates: {},
	widgets: [],
	initInstance: function (container) {

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

		var codeBlocks = document.querySelectorAll('pre code');
		_.each(codeBlocks, function (block) {
			block.innerHTML = _.escape(block.innerHTML);
			hljs.highlightBlock(block);
		});

		var handler = function (origin) {

			var reservedEventNames = /^(?:change|complete|reset|teardown|update|construct|config|init|render|unrender|detach|insert)$/;
			if (!reservedEventNames.test(this.event.name)) {
				console.log('Event',  this.event.name);
				console.log('Event handler arguments',  origin);

				var eventName = 'events.' + origin.get('uid');
				if (!this.get(eventName)) {
					this.set(eventName, []);
				}
				this.push(eventName, this.event.name);
			}
		};

		var containers = document.querySelectorAll('.ractivef');
		for (var i = 0; i < containers.length; i++) {
			var instance = RactiveF.initInstance(containers[i]);
			instance.on('*.*', handler);
			RactiveF.widgets.push(instance);
		}

	});
}