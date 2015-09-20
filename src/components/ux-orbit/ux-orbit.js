Ractive.extend({

	template: Ractive.defaults.templates['ux-orbit'],

	isolated: true,

	data: {
		currentPage: 1,
		navigation_arrows: true,
		slide_number: true,
		bullets: true
	},

	computed: {
		currentPageCssClass: function () {
			return 'currentPage' + this.get('currentPage');
		}
	},

	oninit: function () {

		this.on('nextPage', function (e) {
			var nextPage = this.get('currentPage') + 1,
				slideTotal = this.get('slidesTotal');

			nextPage = nextPage > slideTotal ? slideTotal : nextPage;
			this.set('currentPage', nextPage);
			return false;
		});

		this.on('prevPage', function (e) {
			var prevPage = this.get('currentPage') -1 ;
			// FIXME Quick hack for bounds.
			prevPage = prevPage < 1 ? 1 : prevPage;
			this.set('currentPage', prevPage);
			return false;
		});

	},

	oncomplete: function () {
		var slidesTotal = this.findAll('.orbit-slides-slide').length;
		this.set('slidesTotal', slidesTotal);
	}

});
