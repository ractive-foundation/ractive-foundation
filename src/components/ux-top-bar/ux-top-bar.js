Ractive.extend({

	template: RactiveF.templates['ux-top-bar'],

	oninit: function () {

		var self = this;

		self.set('yPos', 0);

		this.on('toggleMenu', function(e) {

			if (self.get('isExpanded')) {
				self.set('isExpanded', false);
			} else {
				self.set('isExpanded', true);
			}

			return false;

		});

	},

	oncomplete: function () {

		var self = this;
		var topbar = self.find('.top-bar');
		var topbarOffset = RactiveF.elementOffset(topbar);

		window.onscroll = function (e) {
			if (self.get('isSticky')) {
				self.set('isFixed', RactiveF.pageYOffset() > topbarOffset.top);
			}
		};

	}

});
