Ractive.extend({
	template: RactiveF.templates['ux-checkout-identity'],

	data: function () {
		return {
			person: {
				personId : 'default ID1111',
				personName : 'default value222'
			}
		};
	},

	computed: {
		submitButtonDataModel: function () {
			return {
				onclick:'submitButtonDataModel',
				text: 'Submit Order!'
			};
		},
		uploadIdentityDataModel: function() {
			return {
				onchange : 'changedNRICUpload',
				inputName : 'identityCard'
			};
		},
		populateIdNumber: function() {
			var personId = this.get('person.personId');
			var returnObj = {
				inputName : 'cardId',
				value : personId
			};
			return returnObj;
		},
		populateName: function() {
			var personName = this.get('person.personName');
			return {
				inputName : 'personName',
				value : personName
			};
		}
	},

	oninit: function () {

		this.on('*.changedNRICUpload', function (fileList) {
			this.submitIdentity(fileList[0]);
			return false;
		});

		this.observe( 'populateIdNumber', function() {
			console.log('something changed');
		});

	},

	submitIdentity: function (file) {

		var self = this;

		// TODO Disable some stuff

		// Use the service URL provided in initial datamodel - see index.html.
		var serviceURL = this.get('uploadIdentity.serviceURL');

		// Create some payload using the uploaded file data or whatever.
		var payload = this.get('person');
		payload.fileName = file.name;

		// See https://github.com/pyrsmk/qwest for API details.
		RactiveF.plugins.qwest
			// Using get because ractive-foundation server only supports GET by default.
			.get(serviceURL, payload)
			.then(function (response) {
				self.set('person', response.data.person);
			})
			.catch(function (err) {
				debugger;
			});

	}

});
