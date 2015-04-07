Ractive.extend({

	template: RactiveF.templates['ux-iconbaritem'],

	computed: {
		guid: function () {
			return this._guid;
		}
	},

	onrender: function () {

		// Wait for parent component to set "datamodel" and then map that back into data again.
		this.observe('datamodel', function (newDataModel) {
			if (newDataModel) {
				// Lift datamodel data into root data scope.
				this.set(newDataModel);
			}
		});

	}

});
