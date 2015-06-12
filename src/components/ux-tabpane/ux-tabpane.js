Component.extend({

	template: RactiveF.templates['ux-tabpane'],

	onconfig: function () {
		var datamodel = this.get('datamodel');
		if (datamodel) {
			// For datamodel driven components, the tab content can be html containing more ux components.
			// Therefore, we have to evaluate this, so we do that by injecting a partial here.
			// See http://docs.ractivejs.org/latest/partials#updating
			this.partials.dynamicContent = Ractive.parse(datamodel.content);
		}
	}

});
