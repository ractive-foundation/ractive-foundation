Ractive.extend({
	template: RactiveF.templates['ux-accordionitem'],
	computed: {
		guid: function () {
			return this._guid;
		}
	},
	oninit: function () {

		var anchor = this.findComponent('ux-anchor');
		var content = this.findComponent('ux-content');

		// Link the anchor to the content by the content's id for nice html.
		anchor.set({
			href: '#' + this.findComponent('ux-content')._guid
		});

		content.set({
			active: this.get('active') || false
		});

		// Listen for click event on accordion title element, and then fire a semantic event for accordion.
		anchor.on('anchorClicked', function (e) {
			this.fire('changeAccordion', this);
			return false;
		}.bind(this));

	},
	onchange: function () {
		this.findComponent('ux-content').set({
			active: this.get('active')
		});
	}
});
