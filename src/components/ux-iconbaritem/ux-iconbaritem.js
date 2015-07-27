Ractive.extend({

	template: Ractive.defaults.templates['ux-iconbaritem'],

	computed: {
		guid: function () {
			return this._guid;
		}
	}

});
