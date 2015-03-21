Ractive.extend({
	template: RactiveF.templates.uxiconbaritem,
	isolated: true,
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});
