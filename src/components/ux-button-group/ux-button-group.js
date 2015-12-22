Ractive.extend({
	template: Ractive.defaults.templates['ux-button-group'],

	isolated: true,
	
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});
