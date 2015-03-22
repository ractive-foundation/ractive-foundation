Ractive.extend({
	template: RactiveF.templates.uxtabarea,
	oninit: function () {

		var tabLinks = this.findComponent('uxtablinks');
		var tabPanes = this.findComponent('uxtabpanes');

		var tabLink = tabLinks.findAllChildComponents('uxtablink');
		var tabPane = tabPanes.findAllChildComponents('uxtabpane');

		_.each(tabLink, function (link, i) {
			var childPane = tabPane[i];
			if (childPane) {
				link.set({
					tabPane: childPane,
					uid: link._guid
				});
			}
		});
	}
});
