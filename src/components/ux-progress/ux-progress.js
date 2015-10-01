Ractive.extend({
	template: Ractive.defaults.templates['ux-progress'],
	isolated: true,
	computed: {
		meterStyle: function () {
			return 'width: ' + (this.get('value') || '0') + '%';
		}
	}
});
