Ractive.extend({
	template: RactiveF.templates['ux-iconbaritem'],
	components: RactiveF.components,
	isolated: true,
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});
