Ractive.extend({
	template: Ractive.defaults.templates['ux-tooltip'],
	isolated: true,
	data: function () {
		return {
			className: 'ux-tooltip',
			tabindex: 0
		};
	}
});
