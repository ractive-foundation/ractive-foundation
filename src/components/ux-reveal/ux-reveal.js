Ractive.extend({
	template: Ractive.defaults.templates['ux-reveal'],
	isolated: true,

	data: {
		modalVisible: false,
		closetext: '&times;'
	},

	oninit: function () {
		this.on('toggleModal', function (e) {
			this.set('modalVisible', !this.get('modalVisible'));
			document.body.style.overflow = (this.get('modalVisible')) ? 'hidden' : 'auto';
			this.fire('toggleReveal', e);
			return false;
		});
	}

});
