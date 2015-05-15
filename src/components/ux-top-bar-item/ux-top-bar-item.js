Ractive.extend({
	template: RactiveF.templates['ux-top-bar-item'],
	oninit: function() {

		var top_bar = this.findParent('ux-top-bar');
		this.on('select', function() {
			if (top_bar.get('isExpanded')) {
				top_bar.set('isExpanded', false);
				// no need to preventDefault here
			}
		});

	}
});
