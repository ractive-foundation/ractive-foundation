Ractive.extend({
	template: RactiveF.templates['ux-top-bar'],
	oninit: function () {

		var self = this;

		this.on('toggleMenu', function(e) {

			if (self.get('isExpanded')) {
				self.set('isExpanded', false);
			} else {
				self.set('isExpanded', true);
			}

			return false;

		});

	}

});
