Ractive.extend({
	template: RactiveF.templates['ux-checkout-identity'],
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
		var self = this;
		this.on( '*.changedNRICUpload', function (event) {
			return self.changedNRICUpload(event);
		});

		this.observe( 'populateIdNumber', function() {
			console.log('something changed');
		});
	},
	onconfig: function () {
		var person = {
			personName : 'default value',
			personId : 'default ID'
		};
		this.set('person' , person);
		console.log('BLAH@@@@');
	},

	changedNRICUpload : function (event) {
		console.log('event' + event);
		this.submitIdentity(event);
		return false;
	},
	submitIdentity : function(event) {
		//Disable some stuff

		//Enable after then
		console.log('asdasd');
		console.log(this.get('serviceURL'));




		
		var personId = '1234123';
		var personName = 'personName';

		this.set('person.personId', personId);
		this.set('person.personName', personName);

		
		//console.log(JSON.stringify(this.get('populateIdNumber()')));

	}

});
