Ractive.extend({
	template: Ractive.defaults.templates['ux-pagination'],
	data: {
		nextText: '&raquo;',
		prevText: '&laquo;',
		skipText: '&hellip;'
	},
	computed: {
		pages: function() {
			var pages        = [],
				currentPage  = this.get('currentPage'),
				totalPages   = this.get('totalPages'),
				displayPages = this.get('displayPages');

			var split2      = false,
				split3      = false,
				split2Start = 0,
				split3Start = 0,
				split2Size  = (displayPages - 1) / 2,
				split3Size  = (displayPages - 2) / 3;

			pages.push({
				arrow: true,
				unavailable: currentPage !== 1,
				content: this.get('prevText'),
				page: currentPage - 1,
				class: 'prev'
			});

			if (currentPage < Math.ceil(split2Size) ||
				totalPages - currentPage < Math.ceil(split2Size)
			) {
				split2 = true;
			}
			else if (currentPage > Math.ceil(split3Size) ||
				totalPages - currentPage < Math.ceil(split3Size)
			) {
				split3 = true;
			}
			console.log('doing split2', split2);

			for (var i = 1; i <= totalPages; i++) {
				console.log(i + ' - ', i > Math.floor(split2Size));
				console.log(totalPages - i > Math.floor(split2Size));
				if (split2 && (
						i > Math.floor(split2Size) &&
						totalPages - i > Math.floor(split2Size)
					)
				) {
					if (!split2Start) {
						split2Start = true;
						pages.push({
							unavailable: true,
							content: this.get('skipText'),
							title: Math.ceil(split2Size) + ' - ' + (totalPages - Math.ceil(split2Size)),
							class: 'skip'
						});
					}
					continue;
				}
				else if (split3 && (
						i > Math.floor(split3Size) &&
						Math.abs(currentPage - i) > Math.floor(split3Size)
					)
				) {
					if (!split3Start) {
						split3Start = true;
						pages.push({
							unavailable: true,
							content: this.get('skipText'),
							title: Math.ceil(split3Size) + ' - ' + (totalPages - Math.ceil(split3Size)),
							class: 'skip'
						});
					}
					continue;
				}
				split3Start = false;
				pages.push({
					current: currentPage === i,
					content: i,
					page: i,
					class: 'page-' + i
				});
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
