Ractive.extend({

	template: RactiveF.templates['ux-orbit'],

	data: {
		currentPage: 1,
		navigation_arrows: true,
		slide_number: true,
		bullets: true
	},

	computed: {
		currentPageCssClass: function () {
			return 'currentPage' + this.get('currentPage');
		},
		isFirstSlide: function () {
			return this.get('currentPage') === 1;
		},
		isLastSlide: function () {
			console.log('isLastSlide', this.get());
			return this.get('currentPage') === this.get('slidesTotal');
		}
	},

	oninit: function () {

		this.on('nextPage', function (e) {
			var nextPage = this.get('currentPage') + 1;
			this.set('currentPage', nextPage);
			return false;
		});

		this.on('prevPage', function (e) {
			var prevPage = this.get('currentPage') - 1;
			this.set('currentPage', prevPage);
			return false;
		});

	},

	oncomplete: function () {
		var slidesTotal = this.findAll('.orbit-slides-slide').length;
		this.set('slidesTotal', slidesTotal);
	}

});
