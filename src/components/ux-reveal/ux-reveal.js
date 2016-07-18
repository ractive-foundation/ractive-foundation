Ractive.extend({
	template: Ractive.defaults.templates['ux-reveal'],
	isolated: true,

	data: {
		modalVisible: false,
		closetext: '&times;'
	},

	oninit: function () {
		this.on('toggleModal', function (e) {
			this.toggle('modalVisible');
			this.fire('toggleReveal', e);
			return false;
		});

		this.on('innerClick', function (e) {
			// captures clicks inside the modal, to prevent event propagation from closing the modal.
			return false;
		});

		this.observe('modalVisible', function (newValue, oldValue, keypath) {
			document.body.style.overflow = (newValue === true) ? 'hidden' : 'auto';
			return false;
		});
	}

});
