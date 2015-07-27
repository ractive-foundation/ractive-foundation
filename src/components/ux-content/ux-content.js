Ractive.extend({
	template: Ractive.defaults.templates['ux-content'],
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});
