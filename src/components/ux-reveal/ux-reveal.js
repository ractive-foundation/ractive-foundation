Ractive.extend({
	template: Ractive.defaults.templates['ux-reveal'],
	isolated: true,

	data: {
		modalVisible: false
	},

	oninit: function () {

		this.on('toggleModal', function (e) {
			var visible = this.get('modalVisible');
			this.set('modalVisible', !visible);

			this.fire('toggleReveal', {
				visible: this.get('modalVisible')
			});
		});

	}

});
