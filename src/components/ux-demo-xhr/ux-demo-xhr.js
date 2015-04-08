Ractive.extend({

	template: RactiveF.templates['ux-demo-xhr'],

	data: function () {
		return {
			title: 'Demo XHR Component',
			intro: 'Demonstrate a top-level component that posts to an endpoint and gets data back.',
			person: {
				name: 'Elmer Fudd',
				id: '123123123'
			}
		};
	},

	oninit: function () {

		var self = this;

		this.findComponent('ux-button').on('doSomeXhr', function () {

			self.set('person', {
				name: 'new name',
				id: '6666666'
			});

		});

	}

});
