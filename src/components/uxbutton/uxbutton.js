Ractive.extend({
	template: RactiveF.templates.uxbutton,
	onteardown: function () {
    debugger;
    //alert( 'Bye!' );
  },
	computed: {
		inlinePartial: function() {
			// check if there is any inline partial {{>content}} in this ractive component
			return this.partials['content'].length > 0;
		}
	},
	clickHandler: function() {
		// if a click event is specified propagate the click event
		console.log("Button event");
		if(this.get('onclick')) {
			console.log("Firing event");
			this.fire(this.get('onclick'));
		}

		// prevent bubbling
		return true;
	}
});
