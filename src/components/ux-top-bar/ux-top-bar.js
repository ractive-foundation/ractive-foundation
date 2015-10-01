Ractive.extend({

	template: Ractive.defaults.templates['ux-top-bar'],

	isolated: true,

	oninit: function () {

		var self = this;

		this.on('toggleMenu', function(e) {

			if (self.get('isexpanded')) {
				self.set('isexpanded', false);
			} else {
				self.set('isexpanded', true);
			}

			return false;

		});

	},

	oncomplete: function () {

		// Defensive code for isomorphic execution.
		if (typeof window !== 'undefined') {

			var self = this;
			var topbar = self.find('.top-bar');
			var topbarOffset = self.elementOffset(topbar);

			window.addEventListener('scroll', function (e) {
				if (self.get('issticky')) {
					self.set('isfixed', self.pageYOffset() > topbarOffset.top);
				}
			});

		}

	}

});
