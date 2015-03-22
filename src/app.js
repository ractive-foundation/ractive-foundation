RactiveF = {
	components: {},
	templates: {},
	widgets: [],
	initInstance: function (container) {
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