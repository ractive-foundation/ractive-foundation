Ractive.extend({

	template: RactiveF.templates['ux-page-swipe'],

	data: {
		currentPage: 1
	},

	oninit: function () {
		// TODO Compute $('.ux-page-swipe').scrollLeft for each "page" in the container.
	}

});
