Ractive.extend({
	template: RactiveF.templates.uxiconbar,
	data: {
		/**
		 * TODO Move to generic helpers location?
		 * @param num A number, e.g. 1
		 * @returns {string} The number as a word, e.g. "one", "three", etc.
		 */
		numberToWord: function (num) {

			var supportedWords = [
				'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'
			];

			if (!supportedWords[num]) {
				console.error('uxiconbar#numberToWord: num NOT supported: ' + num);
				return '';
			}

			return supportedWords[num];

		}
	},
	oninit: function () {

		var childCount = this.findAllComponents('uxiconbaritem').length;

		if (childCount < 1 || childCount > 8) {
			console.error('uxiconbar only supports between 1-8 items.');
		}

		this.set('upNum', childCount);

	}
});
