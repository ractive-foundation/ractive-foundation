Ractive.extend({
	template: Ractive.defaults.templates['ux-anchor'],
	isolated: true,
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});
