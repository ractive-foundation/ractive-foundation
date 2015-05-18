

Ractive.extend({
	template: RactiveF.templates['ux-top-bar'],
	oninit: function () {

		var self = this;
		var topbar;

		self.set('yPos', 0);

		this.on('toggleMenu', function(e) {

			if (self.get('isExpanded')) {
				self.set('isExpanded', false);
			} else {
				self.set('isExpanded', true);
			}

			return false;

		});


		window.onscroll = function(e) {

			topbar = self.find('.top-bar');

			function getYPos(elem) {
				var box = elem.getBoundingClientRect();
				var body = document.body;
				var docEl = document.documentElement;
				var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
				var clientTop = docEl.clientTop || body.clientTop || 0;
				var top  = box.top +  scrollTop - clientTop;
				return Math.round(top);
			}


			if (self.get('isSticky')) {
				if (window.pageYOffset > self.get('yPos')) {
					self.set('isFixed', true);
				} else {
					self.set('isFixed', false);
					self.set('yPos', getYPos(topbar));
				}
			}

		};

	},
	oncomplete: function () {

		var self = this;

		function getYPos(elem) {
			var box = elem.getBoundingClientRect();
			var body = document.body;
			var docEl = document.documentElement;
			var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
			var clientTop = docEl.clientTop || body.clientTop || 0;
			var top  = box.top +  scrollTop - clientTop;
			return Math.round(top);
		}

		var topbar = self.find('.top-bar');
		self.set('yPos', getYPos(topbar));
	}

});
