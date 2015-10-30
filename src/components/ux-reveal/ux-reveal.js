Ractive.extend({
	template: Ractive.defaults.templates['ux-reveal'],
	data: {
		show: false,
		verticalAlignment: 'center'
	},
	computed: {
		visibility: function() {
			return this.get('show') ? 'visible' : 'hidden';
		},
		top: function() {
			if (this.get('show')) {
				if (this.get('verticalAlignment') === 'center') {
					// calculate the height of the modal and screen to position it in the center
					console.info('calc top');
				}
			}
			else {
				return -100;
			}
		}
	},
	onrender: function() {
		// register the triggers
		var triggers = this.get('triggers');
		if (triggers) {
			// $(triggers.join(',')).on('click', function() {
			// 	this.set('show', true);
			// }.bind(this));
			console.info('');
		}
	}
});
