Ractive.extend({
	template: Ractive.defaults.templates['ux-joyride'],
	isolated: true,

	// any default data
	data: function () {
		return {
			isHidden: true,
			defaultNubTop: 28,
			defaultNubLeft: 22,
			maxMobileWidth: 500,
			styles: {
				top: '0px',
				left: '0px',
				width: 'auto'
			},
			closeText: '&times;'
		};
	},

	oninit: function () {
		//default current step to '0'
		this.set('currentStep', 0);
		//event handlers
		this.on({
			'toggle': this.onToggle.bind(this),
			'hover': this.onHover.bind(this),
			'close': this.onClose.bind(this),
			'prev': this.onPrev.bind(this),
			'next': this.onNext.bind(this)
		});
	},

	oncomplete: function () {
		//isOpenOnInit is true start joyride
		if (this.get('isOpenOnInit')) {
			this.fire('toggle');
		}

		this.set('nubLeft', this.get('defaultNubLeft') + 'px');
	},

	onHover: function (event) {
		if (event) {
			event.original.preventDefault();
			if (_.get(event, 'original.type') === 'mouseover') {
				this.setStepDetails();
			} else {
				this.onClose();
			}
		}
	},

	onToggle: function (event) {
		if (event) {
			event.original.preventDefault();
		}
		// calculate the current positioning of the joyride
		if (this.get('isHidden')) {
			this.setStepDetails();
		} else {
			this.onClose();
		}
	},

	onClose: function (event) {
		if (event) {
			event.original.preventDefault();
		}
		var joyrideTarget = this.get('contents.' + this.get('currentStep') + '.selector');

		if (joyrideTarget) {
			this.focusJoyride(joyrideTarget);
		}
		this.set('isHidden', true);
	},

	onNext: function () {
		this.add('currentStep')
			.then(this.setStepDetails.bind(this));
	},

	onPrev: function () {
		this.subtract('currentStep')
			.then(this.setStepDetails.bind(this));
	},

	setStepDetails: function () {
		var joyrideTarget = this.get('contents.' + this.get('currentStep') + '.selector');
		var hasJoyride  = this.find(joyrideTarget) || this.find('*[aria-haspopup]');

		if (hasJoyride) {
			var position = this.get('open') || 'right';
			position = position.replace(/^\w/, function (t) {
				return t.toUpperCase();
			});
			var positioner = 'positionStep' + position;

			this.set('styles', this[positioner](hasJoyride));

			this.set('isHidden', false);
			_.defer(this.focusJoyride.bind(this, joyrideTarget));
		}
	},

	positionStepRight: function (hasJoyride) {
		var joyride  = this.find('.ux-joyride'),
			documentWidth = document.documentElement.offsetWidth,
			containerWidth = this.el.parentElement.offsetWidth,
			defaultNubTop = this.get('defaultNubTop'),
			stylesObject = {};

		if (documentWidth > this.get('maxMobileWidth')) {
			stylesObject.nubPosition = 'left';
			stylesObject.top = (hasJoyride.offsetTop - defaultNubTop) + 'px';
			stylesObject.left = (hasJoyride.offsetWidth + hasJoyride.offsetLeft + defaultNubTop) + 'px';
			stylesObject.joyrideNubTop = defaultNubTop + 'px';
			stylesObject.width = (containerWidth - joyride.offsetWidth - joyride.offsetLeft - defaultNubTop) + 'px';
		} else {
			stylesObject.nubPosition = 'top';
			stylesObject.top = defaultNubTop + 'px';
			stylesObject.left = '0px';
			stylesObject.joyrideNubTop = (-defaultNubTop) + 'px';
			stylesObject.width = (containerWidth - joyride.offsetLeft - 2) + 'px';
		}

		return stylesObject;
	},

	positionStepLeft: function (hasJoyride) {
	},

	positionStepDown: function () {
		var joyride  = this.find('.ux-joyride'),
			containerWidth = this.el.parentElement.offsetWidth,
			defaultNubTop = this.get('defaultNubTop'),
			stylesObject = {
				nubPosition : 'top',
				top : defaultNubTop + 'px',
				left : '0px',
				joyrideNubTop : (-defaultNubTop) + 'px'
			};

		if (window.screen.width > this.get('maxMobileWidth')) {
			_.extend (stylesObject, {
				width : (containerWidth - joyride.offsetLeft - 2) + 'px'
			});

			this.set('nubLeft', this.get('defaultNubLeft') + 'px');
		} else {
			/* Full width when it's in mobile */
			var joyridePositionLeft = joyride.offsetLeft - this.el.parentElement.offsetLeft;

			_.extend (stylesObject, {
				width : (containerWidth - 2) + 'px',
				left : (-joyridePositionLeft)  + 'px'
			});

			this.set('nubLeft', _.add(joyridePositionLeft, this.get('defaultNubLeft')) + 'px');
		}

		return stylesObject;
	},

	focusJoyride: function (joyrideTarget) {
		//TODO: smooth scolling?
		var joyride = this.find(joyrideTarget).getBoundingClientRect();
		var absoluteElementTop = joyride.top + window.pageYOffset;
		var middle = absoluteElementTop - (window.innerHeight / 2);
		window.scrollTo(0, middle);
	}
});

