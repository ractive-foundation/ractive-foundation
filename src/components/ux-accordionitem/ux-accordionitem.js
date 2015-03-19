Ractive.extend({
	template: RactiveF.templates['ux-accordionitem'],
	oninit: function () {

		var uid = _.uniqueId('ux-accordionitem-');

		// This is how we pass data implicitly through to nested components, meaning the html markup is kept cleaner
		// (i.e, less attributes in the html).
		this.findComponent('ux-anchor').set('href', '#' + uid);
		this.findComponent('ux-content').set({
			id: uid
		});

		// Keep a reference for use later.
		this.set('id', uid);

	},
	onchange: function () {
		this.findComponent('ux-content').set({
			active: this.get('active') || false
		});
	}
});
