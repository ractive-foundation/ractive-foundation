Ractive.extend({
	template: Ractive.defaults.templates['ux-anchor'],
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});
