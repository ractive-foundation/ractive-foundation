Component.extend({
	template: RactiveF.templates['ux-tablinks'],
	oninit: function () {

		// If there is a hash. We want to check deeplinking.
		if (window.location.hash.length) {
			var hash = window.location.hash.substr(1);
			var components = this.findAllChildComponents('ux-tablink');
			_.each(components, function (component) {
				var isActive = component.get('id') === hash;
				component.set('active', isActive);
				component.get('tabPane').set('active', isActive);
			});

		}

		this.on('*.changeTab', function (event) {
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
