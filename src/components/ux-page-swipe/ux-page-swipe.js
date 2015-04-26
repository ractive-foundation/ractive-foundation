Ractive.extend({

	template: RactiveF.templates['ux-page-swipe'],

	data: {
		currentPage: 1
	},

	oninit: function () {

		this.totalPages = 0;
		this.pageWidth = 0;

		this.on('scrollToNearestPage', function (e) {
			var currentPos = e.node.scrollLeft;
			var currentPageIndex = Math.floor(currentPos /  this.pageWidth);
			console.log('currentPage:', currentPageIndex + 1);
			return false;
		});

	},

	oncomplete: function () {
		this.pageWidth = this.find('.page').scrollWidth;
		this.totalPages = this.findAll('.page').length;
	}

});
