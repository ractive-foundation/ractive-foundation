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
			this.fire('toggleReveal', e);
			return false;
		});

		this.observe('modalVisible', function (newValue, oldValue, keypath) {
			document.body.style.overflow = (newValue === true) ? 'hidden' : 'auto';
			return false;
		});
	}

});
