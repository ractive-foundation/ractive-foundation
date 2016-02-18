Ractive.extend({
	template: Ractive.defaults.templates['ux-button'],
	isolated: true,
	data: function () {
		return {
			type: 'button'
		};
	}
});
