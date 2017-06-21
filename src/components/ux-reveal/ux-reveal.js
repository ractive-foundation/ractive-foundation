Ractive.extend({
	template: Ractive.defaults.templates['ux-reveal'],
	isolated: true,

	data: {
		modalVisible: false,
		closetext: '&times;',
		closeOnEsc: true,
		lockBackground: false,
		hideClose: false
	},

	oncomplete: function () {
		this.on('toggleModal', function (e) {
			this.toggle('modalVisible');
			this.fire('toggleReveal', e);
			return false;
		});

		this.observe('modalVisible', function (newValue, oldValue, keypath) {
			document.body.style.overflow = (newValue === true) ? 'hidden' : 'auto';

			if (this.get('closeOnEsc')) {
				if (newValue === true) {
					this.registerCloseOnEsc();
				} else {
					this.unregisterCloseOnEsc();
				}
			}

			return false;
		});

		this.on('closeOnBgClick', function (e) {
			if (!this.get('lockBackground')) {
				this.fire('toggleModal', e);
			}
		});
	},

	// close the modal when ESC key is pressed
	closeOnEsc: function (evt) {
		evt = evt || window.event;
		var isEscape = false;
		// evt.keyCode is about to be deprecated, hence checking 'key' first
		if (evt.key) {
			isEscape = evt.key === 'Escape';
		} else {
			isEscape = evt.keyCode === 27;
		}
		if (isEscape) {
			this.set('modalVisible', false);
		}
	},

	registerCloseOnEsc: function () {
		document.addEventListener('keydown', this.closeOnEsc.bind(this), false);
	},

	unregisterCloseOnEsc: function () {
		document.removeEventListener('keydown', this.closeOnEsc.bind(this), false);
	},

	onteardown: function () {
		this.unregisterCloseOnEsc();
	}

});
