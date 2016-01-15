Ractive.extend({
	template: Ractive.defaults.templates['ux-switch'],
	isolated: true,
	data: function () {
		return {
			type: 'switch'
		};
	},

	oninit: function() {},

	clickHandler: function () {
		this.toggle('checked');

		// if a click event is specified propagate the click event
		if (this.get('onclick')) {
			console.log('Firing event');
			this.fire(this.get('onclick'), this);
		}

		// prevent bubbling
		return true;
	}
});
