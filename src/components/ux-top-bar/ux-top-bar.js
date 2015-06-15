Component.extend({

	template: RactiveF.templates['ux-top-bar'],

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

		var self = this;
		var topbar = self.find('.top-bar');
		var topbarOffset = RactiveF.elementOffset(topbar);

		window.addEventListener('scroll', function (e) {
			if (self.get('issticky')) {
				self.set('isfixed', RactiveF.pageYOffset() > topbarOffset.top);
			}
		});

	}

});
