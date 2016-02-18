Ractive.extend({
	template: Ractive.defaults.templates['ux-tooltip'],
	isolated: true,
	data: function () {
		return {
			tabindex: 0
		};
	}
});
