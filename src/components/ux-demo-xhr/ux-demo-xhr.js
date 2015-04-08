Ractive.extend({

	template: RactiveF.templates['ux-demo-xhr'],

	/**
	 * For demo purposes, just hard-wiring data here for initial load.
	 */
	data: function () {
		return {
			endpoint: '/use-cases/ux-demo-xhr/demo-post-endpoint.json',
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

			// Grab latest data from component and send to the server.
			var endpoint = self.get('endpoint');
			var data = self.get('person');

			// See https://github.com/pyrsmk/qwest for API details.
			RactiveF.plugins.qwest
				// Using get because ractive-foundation server only supports GET by default.
				.get(endpoint, data)
				.then(function (response) {
					self.set('person', response.data.person);
				})
				.catch(function (err) {
					debugger;
				});

		});

	}

});
