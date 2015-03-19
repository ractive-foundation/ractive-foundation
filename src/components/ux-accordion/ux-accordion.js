Ractive.extend({
    template: RactiveF.templates.uxaccordion,
	oninit: function () {

		this.on('*.changeAccordion', function (syntheticEvent) {

			var guid = this._guid;
			var components = this.findAllComponents('uxaccordionitem');

			_(components)
				.filter(function (component) {
					return guid === component.parent._guid;
				})
				.each(function (component) {
					var isActive = component.get('id') === syntheticEvent.context.id;
					component.set('active', isActive);
				})
				.value();

			// Stop bubbling.
			return false;

		});

	}
});
