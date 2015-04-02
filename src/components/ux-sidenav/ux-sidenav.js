Ractive.extend({
	template: RactiveF.templates['ux-sidenav'],
	oninit: function () {
		console.debug('ux-sidenav data:', this.get());
	}
});
