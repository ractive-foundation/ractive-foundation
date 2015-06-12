Component.extend({
	template: RactiveF.templates['ux-button'],
	clickHandler: function () {

		// if a click event is specified propagate the click event

		console.log('Button event');

		if (this.get('onclick')) {
			console.log('Firing event');
			this.fire(this.get('onclick'), this);
		}

		// prevent bubbling
		return true;
	}
});
