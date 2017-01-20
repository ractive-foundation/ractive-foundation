Ractive.extend({
	template: Ractive.defaults.templates['ux-switch'],
	isolated: true,
	data: function () {
		return {
			type: 'switch',
			checked: false
		};
	},

	oninit: function () {
		this.on('clickHandler', function (event) {
			this.toggle('checked');
			this.fire(this.get('onclick'), event);
			return false;
		});
	}

});
