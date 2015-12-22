Ractive.extend({
	template: Ractive.defaults.templates['ux-pagination'],
	data: {
		currentPage: 1,
		displayPages: 10,
		nextText: '&raquo;',
		prevText: '&laquo;',
		skipText: '&hellip;',
		isCollapsed: function (current, page, total, visible) {
			// page is always shown if it is at the ends or is the current page
			if (page === 1 || page === current || page === total) {
				return false;
			}

			// are we showing 1 or 2 collapsed sections?
			if (current < visible / 2) {
				// 1 collapsed section
				return page > visible - 2;
			} else if (total - current <= visible / 2) {
				// 1 collapsed section
				return page < total - visible + 3;
			} else {
				// 2 collapsed sections
				return Math.abs(current - page) > (visible - 4) / 2;
			}
		}
	},
	computed: {
		pages: function () {
			var pages        = [],
				currentPage  = this.get('currentPage'),
				totalPages   = this.get('totalPages'),
				displayPages = this.get('displayPages'),
				isCollapsed  = this.get('isCollapsed'),
				splitStart   = false;

			pages.push({
				arrow: true,
				unavailable: currentPage !== 1,
				content: this.get('prevText'),
				page: currentPage - 1,
				class: 'prev'
			});

			for (var i = 1; i <= totalPages; i++) {
				if (isCollapsed(currentPage, i, totalPages, displayPages)) {
					if (!splitStart) {
						splitStart = true;
						pages.push({
							unavailable: true,
							content: this.get('skipText'),
							class: 'skip'
						});
					}
				} else {
					splitStart = false;
					pages.push({
						current: currentPage === i,
						content: i,
						page: i,
						class: 'page-' + i
					});
				}
			}

			pages.push({
				arrow: true,
				unavailable: currentPage !== totalPages,
				content: this.get('nextText'),
				page: currentPage + 1,
				class: 'next'
			});

			return pages;
		}
	}
});
