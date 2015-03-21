Ractive.extend({
	template: RactiveF.templates.uxbutton,
	computed: {
		inlinePartial: function() {
			// check if there is any inline partial {{>content}} in this ractive component
			return this.partials['content'].length > 0;
		}
	}
});
