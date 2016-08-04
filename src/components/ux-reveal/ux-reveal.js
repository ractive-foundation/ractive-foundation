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

		this.on('closeOnBgClick', function (e) {
			if (!this.get('lockBackground')) {
				this.fire('toggleModal', e);
			}
		});

		if (this.get('closeOnEsc')) {
			this.registerCloseOnEsc();
		}
	},

	registerCloseOnEsc: function () {
		// close the modal when ESC key is pressed
		document.onkeydown = function (evt) {
			if (this.get('modalVisible')) {
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
			}
		}.bind(this);
	}

});
