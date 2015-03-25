Ractive.extend({

	template: RactiveF.templates['ux-iconbar'],

	computed: {

		/**
		 * TODO Move to generic helpers location?
		 * @returns {string} The number of child items as a css class, e.g. "one-up", "three-up", etc.
		 */
		upNum: function () {

			var num = 0;
			var data = this.get();

			// FIXME Bit of a hack for data-driven components.
			// Understand why this occurs. Why has oninit not set "items" yet?
			if (data.isDataModel) {
				num = _.isArray(data.items) ? data.items.length : 0;
			} else {
				num = _.isArray(data.itemComponents) ? data.itemComponents.length : 0;
			}

			var supportedWords = [
				'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'
			];

			if (!supportedWords[num]) {
				console.error('ux-iconbar#numberToWord: num NOT supported: ' + num);
				return '';
			}

			return supportedWords[num] + '-up';

		}

	},

	oninit: function () {

		var itemComponents = this.findAllComponents('ux-iconbaritem');

		var childCount = itemComponents.length;
		if (childCount < 1 || childCount > 8) {
			console.error('ux-iconbar only supports between 1-8 items.');
		}

		// Store for later use.
		this.set('itemComponents', itemComponents);

	}

});
