module.exports = function () {

	// Load standard world object to be 'this' in steps.
	this.World = require('../../world').World;
	require('../../support/steps').call(this);

	this.Before(function (callback) {
		this.component = {};
		this.component.container = '#childComponent ';
		this.component.bullets = this.component.container + '.orbit-bullets ';
		this.component.slides  = this.component.container + ' .orbit-slides-container .orbit-slides-slide';

		this.component.slide1  = this.component.slides + ':nth-of-type(1)';
		this.component.slide2  = this.component.slides + ':nth-of-type(2)';
		this.component.slide3  = this.component.slides + ':nth-of-type(3)';

		this.component.image1  = this.component.slide1 + ' img';
		this.component.image2  = this.component.slide2 + ' img';

		callback();
	});

};
