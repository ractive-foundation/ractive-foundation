Ractive.extend({
	template: Ractive.defaults.templates['ux-tooltip'],

	isolated: true,

	computed: {
		guid: function () {
			return this._guid;
		}
	},

	oninit: function () {
		this.on('tooltipHovered', function (srcItem) {
			this.toggle('open');
			return false;
		});
	},

	oncomplete: function () {
		console.log(this);
	}
});