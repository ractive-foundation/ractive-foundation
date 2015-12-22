Ractive.extend({
	template: Ractive.defaults.templates['ux-inline-list'],
	isolated: true,
	data: {
		getItemData: function (itemData) {
			// Nothing needs to be mapped, but we don't want parent data leaking down.
			return itemData;
		}
	}
});
