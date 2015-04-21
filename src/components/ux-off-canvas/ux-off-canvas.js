Ractive.extend({

	template: RactiveF.templates['ux-off-canvas'],

	data: function () {
		return {
			expandedState: '',
			leftItems: [],
			rightItems: [],
			mainContent: ''
		};
	},

	computed: {

		/**
		 * @returns {string} CSS class: left = move-right or right = move-left.
		 */
		getExpandedClass: function () {

			switch (this.get('expandedState')) {
				case 'left':
					return 'move-right';
				case 'right':
					return 'move-left';
			}

			// Default is empty string for no css class.
			return '';

		}

	},

	oninit: function () {

		// You can expand from left or right, or none. Can't do both at the same time.
		this.on('toggleMenu', function (event, direction) {
			this.set('expandedState', direction);
		});

	}

});
