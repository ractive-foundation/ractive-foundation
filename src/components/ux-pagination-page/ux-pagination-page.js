Ractive.extend({
	template: Ractive.defaults.templates['ux-pagination-page'],
	onrender: function () {
		this.on('anchorClicked', function () {
			this.fire('setPagination', this.get('page'));
		}.bind(this));
	}
});
