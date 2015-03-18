Ractive.extend({
	template: RactiveF.templates.uxtabarea,
	oninit: function () {

		var tabLinks = this.findAllComponents('uxtablink');
		var tabPanes = this.findAllComponents('uxtabpane');

		_.each(tabLinks, function (tabLink) {
			var childPane = _.filter(tabPanes, function (tabPane) {
				return tabLink.get('controls') === tabPane.get('id');
			});

			if (childPane.length) {
				tabLink.set('tabPane', childPane[0]);
			}
		});



	}
});
