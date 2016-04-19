/*global Ractive */
/*jshint sub:true*/
Ractive.extend({
	template: Ractive.defaults.templates['ux-anchor'],
	isolated: true,
	computed: {
		guid: function () {
			return this._guid;
		}
	},
	onconfig: function () {
		this.on('anchorClicked', function () {
			var customEvent = this.get('ontap');
			if (customEvent) {
				var customParams = customEvent.split(':');
				var customEventName = customParams[0];
				if (customParams.length > 1) {
					var params = customParams[1].split(',');
					this.fire(customEventName, this, params);
				} else {
					this.fire(customEvent, this);
				}
				return false;
			}
		});
	}
});
