Ractive.extend({
	template: RactiveF.templates['ux-top-bar-items'],
	data: {
		getTopBarItemCssClass: function (item) {
			var classes = [];
			if (item.active) {
				classes.push('active');
			}
			if (item.hasForm) {
				classes.push('has-form');
			}
			if (item.items && item.items.length > 0) {
				// Note: not-click needed for focus/hover with html class=js. Silly.
				classes.push('has-dropdown not-click');
			}
			if (item.expanded && item.expanded !== 'false') {
				// For sub-nav on mobi.
				classes.push('moved');
			}
			return classes.join(' ');
		}
	},
	oninit: function () {
		this.on('expandItem', function (e) {
			//this.set(e.keypath + '.expanded', true);
			// Allow event through to parent component to act upon.
		});
	}
});
