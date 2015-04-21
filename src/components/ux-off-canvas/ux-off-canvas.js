Ractive.extend({

	template: RactiveF.templates['ux-off-canvas'],

	data: function () {
		return {
			title: 'UX Off Canvas Demo',
			isExpanded: false
		};
	},

	oninit: function () {

		this.on('toggleMenu', function (event) {
			this.toggle('isExpanded');
		});

	}

});
