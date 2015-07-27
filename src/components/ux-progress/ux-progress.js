Ractive.extend({
	template: Ractive.defaults.templates['ux-progress'],
	computed: {
		meterStyle: function () {
			return 'width: ' + (this.get('value') || '0') + '%';
		}
	}
});
