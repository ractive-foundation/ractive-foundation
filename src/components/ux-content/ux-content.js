Ractive.extend({
	template: Ractive.defaults.templates['ux-content'],
	isolated: true,
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});
