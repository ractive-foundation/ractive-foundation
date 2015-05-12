Ractive.extend({
	template: RactiveF.templates['ux-topbar'],
	oninit: function () {

		var _self = this;

		this.on('toggleThis', function(e) {

			// var topBar = this.find('.top-bar');
			// var topBarSection = this.find('.top-bar-section');

			if (_self.get('isExpanded')) {
				_self.set('isExpanded', false);
				console.log('false');
			} else {
				_self.set('isExpanded', true);
				console.log('true');
			}



		});

	}
});
