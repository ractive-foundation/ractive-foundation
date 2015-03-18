Ractive.extend({
	template: RactiveF.templates.uxtablinkcontainer,
	oninit: function () {
		this.on('*.changeTab', function (event) {
			var components = this.findAllComponents('uxtablink');
			var guid = this._guid;

			_(components)
				.filter(function (component) {
					return guid === component.parent._guid;
				})
				.each(function (component) {
					var isActive = component.get('controls') === event.context.controls;
					component.set('active', isActive);
				})
				.value();

				return false;
		});
	}
});
