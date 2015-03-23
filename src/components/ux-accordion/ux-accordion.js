Ractive.extend({
	template: RactiveF.templates['ux-accordion'],
	oninit: function () {

		this.set('items', this.findAllChildComponents('ux-accordionitem'));

		this.on('*.changeAccordion', function (syntheticEvent) {

			_.each(this.get('items'), function (component) {
				var isActive = component.get('id') === syntheticEvent.context.id;
				component.set('active', isActive);
			});

			// Stop bubbling.
			return false;

		});

	}

});
