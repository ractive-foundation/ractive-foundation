/*global TinyAnimate*/
Ractive.extend({

	template: RactiveF.templates['ux-page-swipe'],

	data: {
		currentPage: 1
	},

	oninit: function () {

		// see oncomplete.
		this.container = null;
		this.pageWidth = 0;
		this.closestPageIndex = 0;

		// Intent: User has stopped panning with their finger, so lets move the position of the overflow element to
		// the closest page (Math.round).
		this.on('scrollToNearestPage *.scrollToNearestPage', function (e) {
			var currentPos = this.container.scrollLeft;
			this.closestPageIndex = Math.round(currentPos /  this.pageWidth);
			var closestPageScrollLeft = this.closestPageIndex * this.pageWidth;

			//this.container.scrollLeft = closestPageScrollLeft;
			TinyAnimate.animate(this.container.scrollLeft, closestPageScrollLeft, 100, function(x) {
				this.container.scrollLeft = x;
			}.bind(this));

			return false;
		});

	},

	/**
	 * Find DOM elements and cache references to them.
	 */
	oncomplete: function () {
		this.container = this.find('.ux-page-swipe');
		this.pageWidth = this.find('.page').offsetWidth;
	}

});
