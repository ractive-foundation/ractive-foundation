Ractive.extend({
	template: Ractive.defaults.templates['ux-button-groupitem'],

	isolate: true,

	anchorClicked: function () {
		// if a click event is specified propagate the click event
		if (this.get('onclick')) {
			console.log('Firing event');
			this.fire(this.get('onclick'), this);
		}

		// prevent bubbling
		return true;
	}
});
