Ractive.extend({

	template: RactiveF.templates['ux-off-canvas'],

	data: function () {
		return {
			title: 'UX Off Canvas Demo',
			isExpanded: false,
			leftItems: [

				{ label: 'Learn Move' },
				{ label: 'Home', href: '.' },
				{ label: 'Docs', href: 'docs.html' },
				{ label: 'Data', href: 'data.html' },
				{ label: 'Demo', href: 'demo.html' },

				{ label: 'External Links' },
				{ label: 'Foundation docs', href: 'http://foundation.zurb.com/docs/' },
				{ label: 'RactiveJS docs', href: 'http://docs.ractivejs.org/latest/get-started', target: '_blank' }

			],
			rightItems: [

				{ label: 'Asimov\'s Works' },
				{ label: 'Recommended order', href: 'http://scifi.stackexchange' +
				'.com/questions/39669/what-is-the-correct-order-for-reading-material-of-isaac-asimov' }

			],
			mainContent: '<p>Set in the year 0 F.E. (&quot;Foundation Era&quot;), The Psychohistorians opens on ' +
			'Trantor, the capital of the 12,000-year-old Galactic Empire. Though the empire appears stable and ' +
			'powerful, it is slowly decaying in ways that parallel the decline of the Western Roman Empire. ' +
			'Hari Seldon, a mathematician and psychologist, has developed psychohistory, a new field of science and ' +
			'psychology that equates all possibilities in large societies to mathematics, allowing for the ' +
			'prediction of future events.</p>' +
			'<p>Lorem ipsum dolor.</p><p>Lorem ipsum dolor.</p><p>Lorem ipsum dolor.</p><p>Lorem ipsum dolor.</p>'
		};
	},

	computed: {

		/**
		 * You can expand from left and/or right, or none.
		 * @returns {string} CSS class: move-right or move-left.
		 */
		getExpandedClass: function () {

			return this.get('isExpanded') ? 'move-right' : '';

		}

	},

	oninit: function () {

		this.on('toggleMenu', function (event, direction) {
			debugger;
			this.toggle('isExpanded');
		});

	}

});
