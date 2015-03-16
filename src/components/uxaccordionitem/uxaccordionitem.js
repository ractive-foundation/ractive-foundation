Ractive.extend({
	template: RactiveF.templates.uxaccordionitem,
	oninit: function () {

		var uid = _.uniqueId('uxaccordionitem-');

		// This is how we pass data implicitly through to nested components, meaning the html markup is kept cleaner
		// (i.e, less attributes in the html).
		this.findComponent('uxanchor').set('href', '#' + uid);
		this.findComponent('uxcontent').set({
			id: uid,
			active: this.get('active') || false
		});

		// Keep a reference for use later.
		this.set('id', uid);

	}
});
