Ractive.extend({

	template: RactiveF.templates['ux-form-input-file'],

	oninit:  function () {

		// two-way data-binding allows us to modify "value" via form interaction.
		// newValue is a FileList object.
		this.observe('value', function (newValue, oldValue) {

			// Only trigger the semantic event if the data has been set|changed.
			if (newValue !== void 0 && newValue !== oldValue) {

				// Fire semantic event passed in by parent component.
				this.fire(this.get('onchange'), newValue);

			}

		});

	}

});