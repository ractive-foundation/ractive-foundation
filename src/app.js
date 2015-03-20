window.RactiveF = {
	components: {},
	templates: {},
	widgets: {}
};
var initInstance = function (i, container) {

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
			$(this.el)
				.removeClass('hide')
				.addClass('initialized');
		}
	});
};

// TODO: Remove jQuery. Used for convenience.
$(function () {
	RactiveF.widgets = $('.ractivef').not('.initialized').map(initInstance);
});
