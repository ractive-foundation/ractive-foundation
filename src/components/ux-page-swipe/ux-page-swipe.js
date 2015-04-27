Ractive.extend({

	template: RactiveF.templates['ux-page-swipe'],

	data: {
		currentPos: 0,
		moveIncrement: 2
	},

	computed: {
		calculateContainerStyle: function () {
			return [
				'transition-duration: 0ms',
				'-webkit-transition-duration: 0ms',
				'transform: translate3d(' + this.get('currentPos') + 'px, 0px, 0px)',
				'-webkit-transform: translate3d(' + this.get('currentPos') + 'px, 0px, 0px)'
			].join('; ');
		}
	},

	oninit: function () {

		// see oncomplete.
		this.container = null;

		// Intent: User has stopped panning with their finger, so lets move the position of the overflow element to
		// the closest page (Math.round).
		this.on('scrollToNearestPage', function (e) {

			// Get the pageWidth every time, because the viewport size can change.
			var pageWidth = this.find('.page').offsetWidth;
			var closestPageIndex = Math.round(this.get('currentPos') / pageWidth);
			var closestPagePos = closestPageIndex * pageWidth;

			this.set('currentPos', closestPagePos);

			return false;

		});

		this.on('moveNext', function (e) {
			// Drag backwards to go "next"
			var newPos = this.get('currentPos') - this.get('moveIncrement');
			// TODO Check for outer bound.
			this.set('currentPos', newPos);
			return false;
		});

		this.on('movePrev', function (e) {
			// Push forwards to go "prev".
			var newPos = this.get('currentPos') + this.get('moveIncrement');
			// Check bounds.
			newPos = newPos > 0 ? 0 : newPos;
			this.set('currentPos', newPos);
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
