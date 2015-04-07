Ractive.extend({

	template: RactiveF.templates['ux-iconbar'],

	/**
	 * TODO Move to generic helpers location?
	 * @returns {string} The number of child items as a css class, e.g. "one-up", "three-up", etc.
	 */
	calculateUpNum: function (num) {

		var supportedWords = [
			'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'
		];

		if (!supportedWords[num]) {
			console.error('ux-iconbar#numberToWord: num NOT supported: ' + num);
			return '';
		}

		var returnValue = supportedWords[num] + '-up';

		return returnValue;

	},

	oninit: function () {

		// FIXME We have to wait until oninit for markup-driven components to be setup correctly.
		var itemComponents = this.findAllChildComponents('ux-iconbaritem');
		this.set('upNumClass', this.calculateUpNum(itemComponents.length));

		if (this.get('isDataModel')) {
			// Only observe on data-driven components.
			this.observe('items', function (newValue) {
				this.set('upNumClass', this.calculateUpNum(newValue.length));
			});
		}

		// FIXME Need to propagate change event down into child components, if data is changed.
		// We shouldn't have to do this?
		this.on('change', function (keypaths) {

			if (keypaths.items) {

				var itemComponents = this.findAllChildComponents('ux-iconbaritem');

				debugger;

				_.each(itemComponents, function (component, i) {
					component.set(keypaths.items[i]);
				});

			}

		});

	}

});
