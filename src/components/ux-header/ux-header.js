Ractive.extend({
	template: Ractive.defaults.templates['ux-header'],
	isolated: true,
	data: function () {
		return {
			level: 1
		};
	}
});
