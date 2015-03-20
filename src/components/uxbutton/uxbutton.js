Ractive.extend({
	template: RactiveF.templates.uxbutton,
	computed: {
		cdata: function() {
			//debugger;
			console.log(Object.keys(this.get()).length);
			return Object.keys(this.get()).length === 0;
		}
	}
});
