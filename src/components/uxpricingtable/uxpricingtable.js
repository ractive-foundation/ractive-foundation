Ractive.extend({
	template: RactiveF.templates.uxpricingtable,
	oninit: function () {

		this.on('buyNow', function (syntheticEvent) {

			if (!syntheticEvent.context.status || 'buynow' === syntheticEvent.context.status) {
				return;
			}

			alert('Sorry, can\'t buy this phone...');

			// Else - it's in a disabled state, so lets block the event from bubbling and stop the anchor.
			syntheticEvent.original.preventDefault();

		});

	}
});
