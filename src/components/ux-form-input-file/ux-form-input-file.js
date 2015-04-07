Ractive.extend({
	template: RactiveF.templates['ux-form-input-file'],
	data: { value:''},
	twoway: false,
	oninit: function () {
		
	},
	onrender :  function () {
		var self = this;
		this.observe( 'value', function () {
		    var event = new Event( 'change' );
		    this.find( 'input' ).dispatchEvent( event );
		});
		this.find( 'input' ).addEventListener( 'change', function ( event ) {
		    
			return self.onChangeEvent(event);
		});
	},
	onChangeEvent : function (event) {
		console.log( 'event was fired', event );
	    if (this.get('onchange')) {
			console.log('FileChanged Firing event', this.get('onchange'));
			this.fire(this.get('onchange'), event);
		}
		return false;
	}
});
