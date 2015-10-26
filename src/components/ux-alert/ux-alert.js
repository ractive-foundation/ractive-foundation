Ractive.extend({
	template: Ractive.defaults.templates['ux-alert'],
	oninit: function (options) {
		this.on('closeClicked', function () {
			this.teardown();
			return false;
		});
	}
});
