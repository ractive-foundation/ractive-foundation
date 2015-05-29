Ractive.extend({
	template: RactiveF.templates['ux-pagination'],
	oncomplete: function() {

		var self = this;
		var paginationUrl = self.get('pageurl');

		self.on('setCurrent', function(e) {
			if (!paginationUrl) {
				self.set('currentpage', parseInt(e.node.innerText));
				buildPagination();
				return false;
			}
		});

		self.on('setNext', function(e) {
			if (!self.get('nextunavailable') && !paginationUrl) {
				self.set('currentpage', self.get('currentpage') + 1);
				buildPagination();
				return false;
			}
		});

		self.on('setPrevious', function(e) {
			if (!self.get('previousunavailable') && !paginationUrl) {
				self.set('currentpage', self.get('currentpage') - 1);
				buildPagination();
				return false;
			}

		});

		function buildPagination() {
			var pageCount = self.get('pagecount');
			var itemLimit = self.get('itemlimit');
			var items = [];
			var current = self.get('currentpage');

			self.set('previousunavailable', (current === 1));
			self.set('nextunavailable', (current === pageCount));

			function pushItem(i) {

				if (paginationUrl) {
					items.push({'label': i,
						'href': paginationUrl.replace('((page))', i),
					 	'current': i === current});
				} else {
					items.push({'label': i,
						'href': '#' + i,
						'current': i === current});
				}
			}

			if (pageCount <= itemLimit) {
				for (var i = 1; i <= pageCount; i++) {
					pushItem(i);
				}
			} else {

				if (current <= 4) {										// if current is within 4 positions from 1
					for (var i = 1; i <= 7; i++) {
						pushItem(i);
					}

					items.push({'blank': true});

					for (var i = pageCount-1; i <= pageCount; i++) {
						pushItem(i);
					}

				} else if (current >= (pageCount-4)) {					// if current is within 4 positions from max

					for (var i = 1; i <= 2; i++) {
						pushItem(i);
					}

					items.push({'blank': true});

					for (var i = pageCount-6; i <= pageCount; i++) {
						pushItem(i);
					}

				} else if ((current > 4) && (current < (pageCount-4))) {		// if current is somewhere inbetween

					for (var i = 1; i <= 2; i++) {
						pushItem(i);
					}

					items.push({'blank': true});

					for (var i = (current - 2); i <= (current + 2); i++) {
						pushItem(i);
					}

					items.push({'blank': true});

					for (var i = (pageCount - 1); i <= pageCount; i++) {
						pushItem(i);
					}
				}

			}

			self.set('items', items);

		}

		buildPagination();

	}

});
