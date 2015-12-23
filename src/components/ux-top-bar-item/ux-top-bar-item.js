Ractive.extend({
	template: Ractive.defaults.templates['ux-top-bar-item'],
	isolated: true,
	computed: {
		topBarItemCssClass: function () {
			var classes = [this.get('class')],
				active  = this.get('active'),
				hasForm = this.get('hasForm'),
				items   = this.get('items');
			if (active) {
				classes.push('active');
			}
			if (hasForm) {
				classes.push('has-form');
			}
			if (items && items.length > 0) {
				// Note: not-click needed for focus/hover with html class=js. Silly.
				classes.push('has-dropdown not-click');
			}
			return classes.join(' ');
		}
	}
});
