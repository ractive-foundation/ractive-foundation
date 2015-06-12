Component.extend({

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

			// Default is empty string for no css class.
			var classMap = {
				'left': 'move-right',
				'right': 'move-left'
			};

			return classMap[this.get('expandedState')] || '';

		}

	},

	oninit: function () {

		// You can expand from left or right, or none. Can't do both at the same time.
		this.on('updateMenu', function (event, direction) {
			this.set('expandedState', direction);
		});

	}

});
