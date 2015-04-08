Ractive.extend({
	template: RactiveF.templates['ux-checkout-identity'],

	data: function () {
		return {
			endpoint: '/use-cases/ux-checkout-identity/demo-post-data.json',
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

	submitIdentity: function (event) {

		//Disable some stuff

		//Enable after then
		console.log('submitIdentity');
		console.log(this.get('serviceURL'));

		this.set('person', {
			personId: '8888888888888',
			personName: 'fix me'
		});

	}

});
