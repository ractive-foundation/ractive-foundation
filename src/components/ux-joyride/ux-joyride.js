Ractive.extend({
	template: Ractive.defaults.templates['ux-joyride'],
	isolated: true,

	// any default data
	data: {
		component: 'ux-joyride',
		isHidden: true,
		defaultNubTop: 28,
		maxMobileWidth: 500,
		styles: {
			top: '0px',
			left: '0px',
			width: 'auto'
		},
		closeText: '&times;',
		joyrideTarget: ''
	},

	oninit: function () {
		//default current step to '0'
		this.set('currentStep', 0);
		//event handlers
		this.on('toggle', this.onToggle.bind(this));

		this.on('close', this.onClose.bind(this));

		this.on('prev', this.onPrev.bind(this));

		this.on('next', this.onNext.bind(this));
	},

	oncomplete: function () {
		//isOpenOnInit is true start joyride
		if (this.get('isOpenOnInit')) {
			this.fire('toggle');
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
			this.close();
		}
	},

	onClose: function (event) {
		if (event) {
			event.original.preventDefault();
		}
		var joyrideTarget = this.get('contents.' + this.get('currentStep') + '.selector');
		var hasJoyride  = this.find(joyrideTarget) || this.find('*[aria-haspopup]');

		hasJoyride.focus();
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

			this.set('styles', stylesObject);

			this.set('isHidden', false);
			_.defer(function () {
				hasJoyride.focus();
			});
		}
	}
});

