Ractive.extend({
	template: RactiveF.templates['ux-checkout-identity'],

	data: function () {
		return {
			person: {
				personId : 'please enter your id',
				personName : 'please enter number'
			},
			message : ''
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
			//console.log('fileList' + JSON.stringify(fileList));
			this.submitIdentity(fileList);
			return false;
		});

		this.observe( 'populateIdNumber', function() {
			console.log('something changed');
		});

	},

	submitIdentity: function (file) {

		var self = this;
		self.set('message', 'Currently Uploading File');
		// TODO Disable some stuff

		// Use the service URL provided in initial datamodel - see index.html.
		var serviceURL = this.get('uploadIdentity.serviceURL');

		// Create some payload using the uploaded file data or whatever.
		var formData = new FormData();
		formData.append('userPhoto', file);

		// See https://github.com/pyrsmk/qwest for API details.
		RactiveF.plugins.qwest
			// Using get because ractive-foundation server only supports GET by default.
			.post(serviceURL, formData,{dataType:'document', timeout : '10000'})
			.then(function (response) {
				self.set('message', 'Completed');

				var person ={};
				if(response.data.person.ErrorMessage) {
					self.set('message', response.data.person.ErrorMessage);
				}

				if(response.data.person.idimage) {
					person.idimage = response.data.person.idimage;
				} else {
					person.idimage ='';
				}
				person.personId = response.data.person.ID;
				person.personName = response.data.person.FullName;

				self.set('person', person);
			})
			.catch(function (err) {
				debugger;
			});

	}

});
