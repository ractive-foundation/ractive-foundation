Ractive.extend({

	template: RactiveF.templates['ux-accordion'],

	oninit: function () {

		this.set('items', this.findAllChildComponents('ux-accordionitem'));

		this.on('*.changeAccordion', function (syntheticEvent) {

			_.each(this.get('items'), function (component) {

				var userSelectedThisItem = component.get('id') === syntheticEvent.context.id;

				if (userSelectedThisItem) {

					// Support open and close behaviours with repeated clicking by User.
					component.toggle('active');
					
				} else {

					// Not where the User clicked, so close it (if open).
					component.set('active', false);

				}

			});

			// Stop bubbling.
			return false;

		});

	}

});
