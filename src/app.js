window.RactiveF = {
	components: {},
	templates: {},
	widgets: {}
};
var initInstance = function (i, container) {
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

