Ractive.components["ux-accordion"] = Ractive.extend({

	template: Ractive.defaults.templates['ux-accordion'],

	isolated: true,

	computed: {
		guid: function () {
			return this._guid;
		}
	},

	oninit: function () {

		this.set('componentItems', this.findAllChildComponents('ux-accordionitem'));

		this.on('*.changeAccordion', function (srcItem) {

			_.each(this.get('componentItems'), function (component) {

				// Is this the item the user clicked on?
				if (component._guid === srcItem._guid) {

					// Support open and close behaviours with repeated clicking by User.
					component.toggle('active');

				} else {

					// Not where the User clicked, so close it (if open).
					component.set('active', false);

				}

			});
		});

	}

});

Ractive.components["ux-accordionitem"] = Ractive.extend({

	template: Ractive.defaults.templates['ux-accordionitem'],

	isolated: true,

	computed: {
		guid: function () {
			return this._guid;
		}
	},

	oninit: function () {

		var anchorComponent = this.findComponent('ux-anchor'),
			contentComponent = this.findComponent('ux-content');

		// Link the anchor to the content by the content's id for nice html.
		anchorComponent.set({
			href: '#' + contentComponent._guid
		});

		contentComponent.set({
			active: this.get('active') || false
		});

		// Listen for click event on accordion title element, and then fire a semantic event for accordion.
		anchorComponent.on('anchorClicked', function (e) {
			this.fire('changeAccordion', this);
			return false;
		}.bind(this));

		this.set({
			contentComponent: contentComponent,
			initialized: true
		});

	},

	onchange: function () {

		if (!this.get('initialized')) {
			// Not ready yet for onchange.
			return;
		}

		this.get('contentComponent').set({
			active: this.get('active')
		});

	}

});

Ractive.components["ux-alert"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-alert'],
	oninit: function (options) {
		this.on('closeClicked', function () {
			this.teardown();
			return false;
		});
	}
});

Ractive.components["ux-anchor"] = /*global Ractive */
/*jshint sub:true*/
Ractive.extend({
	template: Ractive.defaults.templates['ux-anchor'],
	isolated: true,
	computed: {
		guid: function () {
			return this._guid;
		}
	},
	onconfig: function () {
		this.on('anchorClicked', function () {
			var customEvent = this.get('ontap');
			if (customEvent) {
				var customParams = customEvent.split(':');
				var customEventName = customParams[0];
				if (customParams.length > 1) {
					var params = customParams[1].split(',');
					this.fire.apply(this, [customEventName, this].concat(params));
				} else {
					this.fire(customEvent, this);
				}
				return false;
			}
		});
	}
});

Ractive.components["ux-breadcrumb-item"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-breadcrumb-item'],
	isolated: true
});

Ractive.components["ux-breadcrumbs"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-breadcrumbs'],
	isolated: true
});

Ractive.components["ux-button"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-button'],
	isolated: true,
	computed: {
		isDisabled: function () {
			var disabled = this.get('disabled');
			if (typeof disabled === 'undefined') {
				return false;
			}
			return disabled !== '';
		}
	},
	data: function () {
		return {
			type: 'button'
		};
	},
	clickHandler: function () {

		// if a click event is specified propagate the click event
		if (this.get('onclick')) {
			console.log('Firing event');
			this.fire(this.get('onclick'), this);
		}

		// prevent bubbling
		return true;
	}
});

Ractive.components["ux-button-group"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-button-group'],
	isolated: true
});

Ractive.components["ux-button-group-item"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-button-group-item'],
	isolated: true
});

Ractive.components["ux-col"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-col'],
	isolated: true
});

Ractive.components["ux-content"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-content'],
	isolated: true,
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});

Ractive.components["ux-flex-video"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-flex-video'],
	isolated: true
});

Ractive.components["ux-header"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-header'],
	isolated: true,
	data: function () {
		return {
			level: 1
		};
	}
});

Ractive.components["ux-iconbar"] = Ractive.extend({

	getUpNumClass: function (num) {

		var supportedWords = [
			'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'
		];

		if (!supportedWords[num]) {
			//console.error('ux-iconbar#numberToWord: num NOT supported: ' + num);
			return '';
		}

		return supportedWords[num] + '-up';

	},

	template: Ractive.defaults.templates['ux-iconbar'],

	isolated: true,

	data: {

		getItemData: function (itemData) {
			// Nothing needs to be mapped, but we don't want parent data leaking down.
			return itemData;
		}

	},

	computed: {

		/**
		* TODO Move to generic helpers location?
		* @returns {string} The number of child items as a css class, e.g. "one-up", "three-up", etc.
		*/
		upNumClass: function () {

			var items = this.get('items');

			if (!items) {
				return '';
			}

			// Data-driven component has items data.
			return this.getUpNumClass(items.length);

		}

	},

	oninit: function () {

		// Only needed for markup mode.
		if (!this.get('isDataModel')) {
			var itemComponents = this.findAllChildComponents('ux-iconbaritem');
			var cssClass = this.get('class') || '';
			this.set('class', cssClass + ' ' + this.getUpNumClass(itemComponents.length));
		}

	}

});

Ractive.components["ux-iconbaritem"] = Ractive.extend({

	template: Ractive.defaults.templates['ux-iconbaritem'],

	isolated: true,

	data: {
		labels: true
	},

	computed: {
		guid: function () {
			return this._guid;
		}
	}

});

Ractive.components["ux-inline-list"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-inline-list'],
	isolated: true,
	data: {
		getItemData: function (itemData) {
			// Nothing needs to be mapped, but we don't want parent data leaking down.
			return itemData;
		}
	}
});

Ractive.components["ux-inline-list-item"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-inline-list-item'],
	isolated: true
});

Ractive.components["ux-joyride"] = Ractive.extend({
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

		window.addEventListener('resize', function () {
			_.debounce(this.setStepDetails(this.get('isHidden')), 500);
		}.bind(this));

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

	setStepDetails: function (isHidden) {
		var joyrideTarget = this.get('contents.' + this.get('currentStep') + '.selector');
		var hasJoyride  = this.find(joyrideTarget) || this.find('*[aria-haspopup]');

		if (hasJoyride) {
			var position = this.get('open') || 'right';
			position = position.replace(/^\w/, function (t) {
				return t.toUpperCase();
			});
			var positioner = 'positionStep' + position;

			this.set('styles', this[positioner](hasJoyride));

			this.set('isHidden', isHidden);
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
			_.extend (stylesObject, {
				nubPosition: 'left',
				top: (hasJoyride.offsetTop - defaultNubTop) + 'px',
				left: (hasJoyride.offsetWidth + hasJoyride.offsetLeft + defaultNubTop) + 'px',
				joyrideNubTop: defaultNubTop + 'px',
				width: (containerWidth - joyride.offsetWidth - joyride.offsetLeft - defaultNubTop) + 'px'
			});
		} else {
			_.extend (stylesObject, {
				nubPosition: 'top',
				top: defaultNubTop + 'px',
				left: '0px',
				joyrideNubTop: (-defaultNubTop) + 'px',
				width: (containerWidth - joyride.offsetLeft - 2) + 'px'
			});
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
				nubPosition: 'top',
				top: defaultNubTop + 'px',
				left: '0px',
				joyrideNubTop: (-defaultNubTop) + 'px'
			};

		if (window.screen.width > this.get('maxMobileWidth')) {
			_.extend (stylesObject, {
				width: (containerWidth - joyride.offsetLeft - 2) + 'px'
			});

			this.set('nubLeft', this.get('defaultNubLeft') + 'px');
		} else {
			/* Full width when it's in mobile */
			var joyridePositionLeft = joyride.offsetLeft - this.el.parentElement.offsetLeft;

			_.extend (stylesObject, {
				width: (containerWidth - 2) + 'px',
				left: (-joyridePositionLeft)  + 'px'
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


Ractive.components["ux-keystrokes"] = Ractive.extend({
	isolated: true,
	template: Ractive.defaults.templates['ux-keystrokes']
});

Ractive.components["ux-label"] = Ractive.extend({
	isolated: true,
	template: Ractive.defaults.templates['ux-label']
});

Ractive.components["ux-li"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-li'],
	isolated: true
});

Ractive.components["ux-off-canvas"] = Ractive.extend({

	template: Ractive.defaults.templates['ux-off-canvas'],

	isolated: true,

	data: function () {
		return {
			expandedState: '',
			leftItems: [],
			rightItems: [],
			mainContent: ''
		};
	},

	computed: {

		/**
		 * @returns {string} CSS class: left = move-right or right = move-left.
		 */
		getExpandedClass: function () {

			// Default is empty string for no css class.
			var classMap = {
				'left': 'move-right',
				'right': 'move-left'
			};

			return classMap[this.get('expandedState')] || '';

		}

	},

	oninit: function () {

		// You can expand from left or right, or none. Can't do both at the same time.
		this.on('updateMenu', function (event, direction) {
			this.set('expandedState', direction);
		});

		this.on('*.menuSelect', function (event) {
			this.set('expandedState', '');
		});

	}

});

Ractive.components["ux-off-canvas-list"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-off-canvas-list'],
	isolated: true
});

Ractive.components["ux-orbit"] = Ractive.extend({

	template: Ractive.defaults.templates['ux-orbit'],

	isolated: true,

	data: {
		currentPage: 1,
		navigation_arrows: true,
		slide_number: true,
		bullets: true
	},

	computed: {
		currentPageCssClass: function () {
			return 'currentPage' + this.get('currentPage');
		}
	},

	oninit: function () {

		this.on('nextPage', function (e) {
			var nextPage = this.get('currentPage') + 1,
				slideTotal = this.get('slidesTotal');

			nextPage = nextPage > slideTotal ? slideTotal : nextPage;
			this.set('currentPage', nextPage);
			return false;
		});

		this.on('prevPage', function (e) {
			var prevPage = this.get('currentPage') - 1;
			// FIXME Quick hack for bounds.
			prevPage = prevPage < 1 ? 1 : prevPage;
			this.set('currentPage', prevPage);
			return false;
		});

	},

	oncomplete: function () {
		var slidesTotal = this.findAll('.orbit-slides-slide').length;
		this.set('slidesTotal', slidesTotal);
	}

});

Ractive.components["ux-pagination"] = Ractive.extend({
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

Ractive.components["ux-pagination-page"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-pagination-page'],
	onrender: function () {
		this.on('anchorClicked', function () {
			this.fire('setPagination', this.get('page'));
		}.bind(this));
	}
});

Ractive.components["ux-panel"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-panel'],
	isolated: true
});

Ractive.components["ux-pricingtable"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-pricingtable'],
	isolated: true,
	oninit: function () {

		this.on('buyNow', function (syntheticEvent) {

			if (!syntheticEvent.context.status || 'buynow' === syntheticEvent.context.status) {
				return;
			}

			// Else - it's in a disabled state, so stop the browser's default action for an anchor.
			syntheticEvent.original.preventDefault();

		});

	}
});

Ractive.components["ux-progress"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-progress'],
	isolated: true,
	computed: {
		meters: function () {
			return this.get('items') || { class: '', value: this.get('value')};
		}
	}
});

Ractive.components["ux-reveal"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-reveal'],
	isolated: true,

	data: {
		modalVisible: false,
		closetext: '&times;',
		closeOnEsc: true,
		lockBackground: false,
		hideClose: false
	},

	oncomplete: function () {
		this.on('toggleModal', function (e) {
			this.toggle('modalVisible');
			this.fire('toggleReveal', e);
			return false;
		});

		this.observe('modalVisible', function (newValue, oldValue, keypath) {
			document.body.style.overflow = (newValue === true) ? 'hidden' : 'auto';

			if (this.get('closeOnEsc')) {
				if (newValue === true) {
					this.registerCloseOnEsc();
				} else {
					this.unregisterCloseOnEsc();
				}
			}

			return false;
		});

		this.on('closeOnBgClick', function (e) {
			if (!this.get('lockBackground')) {
				this.fire('toggleModal', e);
			}
		});
	},

	// close the modal when ESC key is pressed
	closeOnEsc: function (evt) {
		evt = evt || window.event;
		var isEscape = false;
		// evt.keyCode is about to be deprecated, hence checking 'key' first
		if (evt.key) {
			isEscape = evt.key === 'Escape';
		} else {
			isEscape = evt.keyCode === 27;
		}
		if (isEscape) {
			this.set('modalVisible', false);
		}
	},

	registerCloseOnEsc: function () {
		document.addEventListener('keydown', this.closeOnEsc.bind(this), false);
	},

	unregisterCloseOnEsc: function () {
		document.removeEventListener('keydown', this.closeOnEsc.bind(this), false);
	},

	onteardown: function () {
		this.unregisterCloseOnEsc();
	}

});

Ractive.components["ux-row"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-row'],
	isolated: true
});

Ractive.components["ux-sidenav"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-sidenav'],
	isolated: true
});

Ractive.components["ux-sub-nav"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-sub-nav']
});

Ractive.components["ux-switch"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-switch'],
	isolated: true,
	data: function () {
		return {
			type: 'switch',
			checked: false
		};
	},

	oninit: function () {
		this.on('clickHandler', function (event) {
			this.toggle('checked');
			this.fire(this.get('onclick'), event);
			return false;
		});
	}

});

Ractive.components["ux-tabarea"] = Ractive.extend({

	template: Ractive.defaults.templates['ux-tabarea'],

	isolated: true,

	oninit: function () {

		var tabLinks = this.findComponent('ux-tablinks');
		var tabPanes = this.findComponent('ux-tabpanes');

		if (!tabLinks || !tabPanes) {
			// Because datamodel driven components can trigger this too early?
			return;
		}

		var tabLink = tabLinks.findAllChildComponents('ux-tablink');
		var tabPane = tabPanes.findAllChildComponents('ux-tabpane');

		_.each(tabLink, function (link, i) {
			var childPane = tabPane[i];
			if (childPane) {
				link.set({
					tabPane: childPane,
					uid: link._guid
				});
			}
		});
	}

});

Ractive.components["ux-table"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-table'],
	isolated: true,
	data: {
		role: 'grid'
	}
});

Ractive.components["ux-tablink"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-tablink'],
	components: Ractive.components,
	isolated: true,
	oninit: function () {
		var active = this.get('active') || false;
		var tabPane = this.get('tabPane') || null;

		if (tabPane) {
			tabPane.set('active', active);
		}
	}
});

Ractive.components["ux-tablinks"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-tablinks'],
	isolated: true,
	oninit: function () {

		// Defensive code for isomorphic execution.
		if (typeof window !== 'undefined') {
			// If there is a hash. We want to check deeplinking.
			if (window.location.hash.length) {
				var hash = window.location.hash.substr(1);
				var components = this.findAllChildComponents('ux-tablink');

				var hasMatchingHash = _.filter(components, function (component) {
					return component.get('id') === hash;
				});

				if (hasMatchingHash.length) {
					_.each(components, function (component) {
						var isActive = component.get('id') === hash;
						component.set('active', isActive);
						component.get('tabPane').set('active', isActive);
					});
				}

			}
		}

		this.on('*.changeTab', function (event) {

			/**
			 * This currently doesnt work.
			 * @see https://github.com/ractive-foundation/ractive-foundation/issues/122
			 */
			event.original.preventDefault();

			var components = this.findAllChildComponents('ux-tablink');

			_.each(components, function (component) {
				var isActive = component._guid === event.context.uid;
				component.set('active', isActive);
				component.get('tabPane').set('active', isActive);
			});

			this.fire.apply(this, [event.name].concat(arguments));

			return false;
		});
	}
});

Ractive.components["ux-tabpane"] = Ractive.extend({

	template: Ractive.defaults.templates['ux-tabpane'],

	isolated: true

});

Ractive.components["ux-tabpanes"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-tabpanes'],
	isolated: true
});

Ractive.components["ux-thumbnail"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-thumbnail']
});

Ractive.components["ux-tooltip"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-tooltip'],
	isolated: true,
	data: function () {
		return {
			className: 'ux-tooltip',
			tabindex: 0
		};
	}
});

Ractive.components["ux-top-bar"] = Ractive.extend({

	template: Ractive.defaults.templates['ux-top-bar'],

	isolated: true,

	oninit: function () {

		var self = this;

		this.on('toggleMenu', function (e) {

			if (self.get('isexpanded')) {
				self.set('isexpanded', false);
			} else {
				self.set('isexpanded', true);
			}

			return false;

		});

	},

	oncomplete: function () {

		// Defensive code for isomorphic execution.
		if (typeof window !== 'undefined') {

			var self = this;
			var topbar = self.find('.top-bar');
			var topbarOffset = self.elementOffset(topbar);

			window.addEventListener('scroll', function (e) {
				if (self.get('issticky')) {
					self.set('isfixed', self.pageYOffset() > topbarOffset.top);
				}
			});

		}

	}

});

Ractive.components["ux-top-bar-item"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-top-bar-item'],
	isolated: true,
	computed: {
		topBarItemCssClass: function () {
			var classes = [this.get('class')],
				active  = this.get('active'),
				hasForm = this.get('hasForm'),
				items   = this.get('items');
			if (active) {
				classes.push('active');
			}
			if (hasForm) {
				classes.push('has-form');
			}
			if (items && items.length > 0) {
				// Note: not-click needed for focus/hover with html class=js. Silly.
				classes.push('has-dropdown not-click');
			}
			return classes.join(' ');
		}
	}
});

Ractive.components["ux-top-bar-items"] = Ractive.extend({
	template: Ractive.defaults.templates['ux-top-bar-items'],
	isolated: true
});
