Ractive.extend({
    template: RactiveF.templates.uxaccordion,
	oninit: function () {
		this.on('*.changeAccordion', function (syntheticEvent) {
			_.map(this.findAllComponents('uxaccordionitem'), function (component) {
				var isActive = component.get('id') === syntheticEvent.context.id;
				component.set('active', isActive);
			});
		});
	}
});
