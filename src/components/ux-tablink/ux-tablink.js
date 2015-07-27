Ractive.extend({
	template: Ractive.defaults.templates['ux-tablink'],
	components: Ractive.components,
	isolated: true,
	oninit: function () {
		var active = this.get('active') || false;
		var tabPane = this.get('tabPane') || null;

		if (tabPane) {
			tabPane.set('active', active);
		}
	}
});
