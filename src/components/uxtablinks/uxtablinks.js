Ractive.extend({
	template: RactiveF.templates.uxtablinkcontainer,
	oninit: function () {
		this.on('*.changeTab', function (event) {
			var components = this.findAllChildComponents('uxtablink');

			_.each(components, function (component) {
					var isActive = component._guid === event.context.uid;
					component.set('active', isActive);
					component.get('tabPane').set('active', isActive);
			});

			return false;
		});
	}
});
