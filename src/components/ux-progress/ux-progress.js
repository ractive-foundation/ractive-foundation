Ractive.extend({
	template: Ractive.defaults.templates['ux-progress'],
	isolated: true,
	computed: {
		meters: function () {
			return this.get('items') || { class: '', value: this.get('value')};
		}
	}
});
