Ractive.extend({
	template: RactiveF.templates['ux-swipe-slide'],
	oncomplete: function () {
		console.log('ux-swipe-slide oncomplete');
		/* jshint ignore:start */
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			direction: 'horizontal'
		});
		/* jshint ignore:end */
	}
});
