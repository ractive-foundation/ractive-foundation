Ractive.extend({
	template: Ractive.defaults.templates['ux-button'],
	isolated: true,
	computed: {
		isDisabled: function () {
			var disabled = this.get('disabled');
			if (typeof disabled === 'undefined') {
				return false;
			}
			return disabled !== '';
		}
	},
	data: function () {
		return {
			type: 'button'
		};
	},
	clickHandler: function () {

		// if a click event is specified propagate the click event
		if (this.get('onclick')) {
			console.log('Firing event');
			this.fire(this.get('onclick'), this);
		}

		// prevent bubbling
		return true;
	}
});
