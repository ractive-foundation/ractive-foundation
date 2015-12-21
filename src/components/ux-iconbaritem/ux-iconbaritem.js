Ractive.extend({

	template: Ractive.defaults.templates['ux-iconbaritem'],

	isolated: true,

	data: {
		labels: true
	},

	computed: {
		guid: function () {
			return this._guid;
		}
	}

});
