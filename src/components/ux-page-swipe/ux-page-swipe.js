/*global TinyAnimate*/
Ractive.extend({

	template: RactiveF.templates['ux-page-swipe'],

	data: {
		currentPage: 1
	},

	oninit: function () {

		// see oncomplete.
		this.container = null;
		this.closestPageIndex = 0;

		// Intent: User has stopped panning with their finger, so lets move the position of the overflow element to
		// the closest page (Math.round).
		this.on('scrollToNearestPage *.scrollToNearestPage', function (e) {

			// Get the pageWidth every time, because the viewport size can change.
			var pageWidth = this.find('.page').offsetWidth;
			var currentPos = this.container.scrollLeft;
			this.closestPageIndex = Math.round(currentPos / pageWidth);
			var closestPageScrollLeft = this.closestPageIndex * pageWidth;

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
	}

});
