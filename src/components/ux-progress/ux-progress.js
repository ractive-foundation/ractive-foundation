Component.extend({
	template: RactiveF.templates['ux-progress'],
	computed: {
		meterStyle: function () {
			return 'width: ' + (this.get('value') || '0') + '%';
		}
	}
});
