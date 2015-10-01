Ractive.extend({
	template: Ractive.defaults.templates['ux-tablinks'],
	isolated: true,
	oninit: function () {

		// Defensive code for isomorphic execution.
		if (typeof window !== 'undefined') {
			// If there is a hash. We want to check deeplinking.
			if (window.location.hash.length) {
				var hash = window.location.hash.substr(1);
				var components = this.findAllChildComponents('ux-tablink');

				var hasMatchingHash = _.filter(components, function (component) {
					return component.get('id') === hash;
				});

				if (hasMatchingHash.length) {
					_.each(components, function (component) {
						var isActive = component.get('id') === hash;
						component.set('active', isActive);
						component.get('tabPane').set('active', isActive);
					});
				}

			}
		}

		this.on('*.changeTab', function (event) {

			/**
			 * This currently doesnt work.
			 * @see https://github.com/ractive-foundation/ractive-foundation/issues/122
			 */
			event.original.preventDefault();

			var components = this.findAllChildComponents('ux-tablink');

			_.each(components, function (component) {
					var isActive = component._guid === event.context.uid;
					component.set('active', isActive);
					component.get('tabPane').set('active', isActive);
			});

			return false;
		});
	}
});
