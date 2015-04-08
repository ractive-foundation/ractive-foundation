Ractive.extend({
	template: RactiveF.templates['ux-form-input-file'],
	twoway: false,
	oninit: function () {
		console.log( 'onchange ', this.get('onchange') );
	},
	onrender :  function () {

		//ONCE AGAIN BLINDY COPY
		this.observe('datamodel', function (newDataModel) {
			if (newDataModel) {
				// Lift datamodel data into root data scope.
				console.log('datamodel' , newDataModel );
				this.set(newDataModel);
			}
		});


		var self = this;
		this.observe( 'value', function (newValue, oldValue) {
		    var event = new Event( 'change' );
		    this.find( 'input' ).dispatchEvent( event );
			console.log('newvalue' , newValue ,oldValue);
			//return self.onChangeEvent();
		});
		this.find( 'input' ).addEventListener( 'change', function ( event ) {
		    
			return self.onChangeEvent(event);
		});
	},
	onChangeEvent : function () {
		//console.log( 'event was fired', event );
		//console.log( 'onchange ', this.get('onchange') );
	    if (this.get('onchange')) {
			console.log('FileChanged Firing event', this.get('onchange'));
			this.fire(this.get('onchange'), '');
		}
		return false;
	}
});
