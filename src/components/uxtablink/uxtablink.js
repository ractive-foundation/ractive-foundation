Ractive.extend({
	template: RactiveF.templates.uxtablink,
	components: RactiveF.components,
	isolated: true,
	onchange: function () {
		var active = this.get('active') || false;
		var tabPane = this.get('tabPane') || null;

		if (tabPane) {
			tabPane.set('active', active);
		}
	}
});
