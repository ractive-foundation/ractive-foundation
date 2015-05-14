Ractive.extend({
	template: RactiveF.templates['ux-topbar'],
	oninit: function () {

		var _self = this;

		this.on('toggleThis', function(e) {

			if (_self.get('isExpanded')) {
				_self.set('isExpanded', false);
			} else {
				_self.set('isExpanded', true);
			}

			e.original.preventDefault();

		});

	}
	
});
