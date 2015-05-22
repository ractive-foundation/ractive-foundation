Ractive.extend({

	template: RactiveF.templates['ux-top-bar'],

	computed: {

		topBarSectionStyle: function () {

			var expandedlevel = this.get('expandedlevel');
			if (!expandedlevel) {
				return '';
			}

			// As per Foundation's setup.
			var newStyle = 'left: -' + (expandedlevel * 100) + '%';
			return newStyle;

		}

	},

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

		this.on('*.expandItem', function (e) {

			var updateData = {};

			// Mark the item as expanded, for rendering.
			e.component.set(e.keypath + '.expanded', true);

			// items.1 = 1 level, items.1.items.1 = 2 levels.
			updateData.expandedlevel = (e.keypath.split('items.').length - 1);

			// Update the model using keypaths.
			this.set(updateData);

			// FIXME Force checking. Doesn't seem to occur?
			this.update('expandedlevel');

			return false;

		});

		this.on('*.collapseItem', function (e) {

			// Mark the item as NOT expanded, for rendering.
			e.component.set(e.keypath + '.expanded', false);

			var expandedlevel = this.get('expandedlevel') || 0;
			if (expandedlevel > 0) {

				this.set('expandedlevel', expandedlevel - 1);

				// No update('expandedlevel')?

			}

			return false;

		});

	},

	oncomplete: function () {

		var self = this;
		var topbar = self.find('.top-bar');
		var topbarOffset = RactiveF.elementOffset(topbar);

		window.onscroll = function (e) {
			if (self.get('issticky')) {
				self.set('isfixed', RactiveF.pageYOffset() > topbarOffset.top);
			}
		};

	}

});
