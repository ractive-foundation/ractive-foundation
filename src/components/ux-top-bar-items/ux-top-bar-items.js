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
				classes.push('has-dropdown');
			}
			return classes.join(' ');
		}
	}
});
