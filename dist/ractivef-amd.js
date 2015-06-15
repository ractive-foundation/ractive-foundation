/**
 * ractive-foundation - Ractive components for Foundation 5
 * @version 0.0.23
 * @link https://github.com/ractive-foundation/ractive-foundation
 * @license ISC
 */
define(['Ractive', 'underscore'], function (Ractive, _, RactiveF) {
/* jshint ignore:start */
RactiveF = {
	VERSION: '0.0.23',
	components: {},
	templates: {},
	getInstance: function () {
		return Ractive.extend(RactiveF);
	},
	forge: function (options) {
		options = options || {};
		var Instance = RactiveF.getInstance();
		return new Instance(options);
	},

	/*
	 * When working with nested components we only want to find child
	 * components, not all decendants.
	 * @param name
	 */
	findAllChildComponents: function (name) {
		return _.filter(this.findAllComponents(name), function (component) {
			return this._guid === component.parent._guid;
		}.bind(this));
	},

	/**
	 * If we have a "datamodel" property, that should override any other data.
	 * This is now a "data-driven" component.
	 * isDataModel is a flag for hbs logic, on whether to use datamodel data or call {{yield}}.
	 * @see http://docs.ractivejs.org/latest/ractive-reset
	 *
	 * TODO Understand the difference between rendering components off the page vs nested inside others.
	 * onconstruct has empty opts for the latter.
	 */
	onconstruct: function (opts) {
		if (opts.data && opts.data.datamodel) {
			var datamodel = _.cloneDeep(opts.data.datamodel);
			datamodel.isDataModel = true;
			opts.data = _.assign(opts.data, datamodel);
			delete opts.data.datamodel;
		}
	},

	/**
	 * For any data-driven component - if something sets 'datamodel', lift that into root scope.
	 */
	onrender: function () {

		// Wait for parent component to set "datamodel" and then map that back into data again.
		this.observe('datamodel', function (newDataModel) {
			if (newDataModel) {
				// Lift datamodel data into root data scope.
				this.set(newDataModel);
			}
		});

	}

};

/* jshint ignore:start */
var Component = RactiveF.getInstance();
/* jshint ignore:end */

RactiveF.templates['ux-accordion'] = {"v":3,"t":[{"t":7,"e":"ul","a":{"id":[{"t":2,"r":"guid"}],"class":"accordion","data-accordion":0},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-accordionitem","a":{"datamodel":[{"t":2,"r":"."}]}}],"r":"items"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}]}]};
RactiveF.templates['ux-accordionitem'] = {"v":3,"t":[{"t":7,"e":"li","a":{"id":[{"t":2,"r":"guid"}],"class":"accordion-navigation"},"f":[{"t":4,"f":[{"t":7,"e":"ux-anchor","f":[{"t":2,"r":"title"}]}," ",{"t":7,"e":"ux-content","f":[{"t":3,"r":"content"}]}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}]};
RactiveF.templates['ux-anchor'] = {"v":3,"t":[{"t":7,"e":"a","a":{"id":[{"t":2,"r":"guid"}],"href":[{"t":2,"r":"href"}]},"m":[{"t":4,"f":["target=\"",{"t":2,"r":"target"},"\""],"n":50,"r":"target"}],"v":{"tap":"anchorClicked"},"f":[{"t":4,"f":[{"t":3,"r":"content"}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}]};
RactiveF.templates['ux-button'] = {"v":3,"t":[{"t":7,"e":"a","a":{"class":["button ",{"t":2,"r":"class"}]},"m":[{"t":4,"f":["href=\"",{"t":2,"r":"href"},"\""],"r":"href"},{"t":4,"f":[" role=\"",{"t":2,"r":"role"},"\""],"r":"role"},{"t":4,"f":[" aria-label=\"",{"t":2,"r":"ariaLabel"},"\""],"r":"ariaLabel"},{"t":4,"f":[" tabindex=\"",{"t":2,"r":"tabindex"},"\""],"r":"tabindex"}],"v":{"tap":{"m":"clickHandler","a":{"r":[],"s":"[]"}}},"f":[{"t":4,"f":[{"t":2,"r":"text"}],"n":50,"r":"text"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"text"}]}]};
RactiveF.templates['ux-col'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":[{"t":2,"r":"class"}," columns"]},"f":[{"t":16}]}]};
RactiveF.templates['ux-content'] = {"v":3,"t":[{"t":7,"e":"div","a":{"id":[{"t":2,"r":"guid"}],"class":["content ",{"t":4,"f":["active"],"n":50,"r":"active"}]},"f":[{"t":16}]}]};
RactiveF.templates['ux-header'] = {"v":3,"t":[{"t":4,"f":[{"t":7,"e":"h1","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":16}]}],"n":50,"x":{"r":["level"],"s":"_0==1"}}," ",{"t":4,"f":[{"t":7,"e":"h2","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":16}]}],"n":50,"x":{"r":["level"],"s":"_0==2"}}," ",{"t":4,"f":[{"t":7,"e":"h3","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":16}]}],"n":50,"x":{"r":["level"],"s":"_0==3"}}," ",{"t":4,"f":[{"t":7,"e":"h4","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":16}]}],"n":50,"x":{"r":["level"],"s":"_0==4"}}," ",{"t":4,"f":[{"t":7,"e":"h5","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":16}]}],"n":50,"x":{"r":["level"],"s":"_0==5"}}," ",{"t":4,"f":[{"t":7,"e":"h6","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":16}]}],"n":50,"x":{"r":["level"],"s":"_0==6"}}]};
RactiveF.templates['ux-iconbar'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["icon-bar ",{"t":2,"r":"upNumClass"}," ",{"t":2,"r":"class"}],"role":"navigation"},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-iconbaritem","a":{"datamodel":[{"t":2,"x":{"r":["getItemData","."],"s":"_0(_1)"}}]}}],"r":"items"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}]}]};
RactiveF.templates['ux-iconbaritem'] = {"v":3,"t":[{"t":7,"e":"a","a":{"href":[{"t":2,"r":"href"}],"class":["item ",{"t":2,"r":"class"}],"tabindex":"0","role":"button"},"m":[{"t":4,"f":["aria-labelledby=\"",{"t":2,"r":"guid"},"\""],"n":50,"x":{"r":["labels"],"s":"_0!==false"}},{"t":4,"f":["aria-label=",{"t":2,"r":"arialabel"}],"n":50,"r":"arialabel"}],"f":[{"t":4,"f":[{"t":7,"e":"img","a":{"src":[{"t":2,"r":"src"}]}}],"n":50,"r":"src"}," ",{"t":4,"f":[{"t":7,"e":"label","a":{"id":[{"t":2,"r":"guid"}]},"f":[{"t":4,"f":[{"t":3,"r":"label"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}],"n":50,"x":{"r":["labels"],"s":"_0!==false"}}]}]};
RactiveF.templates['ux-li'] = {"v":3,"t":[{"t":7,"e":"li","a":{"class":[{"t":2,"r":"class"}]},"m":[{"t":4,"f":["role=\"",{"t":2,"r":"role"},"\""],"r":"role"}],"f":[{"t":8,"r":"content"}]}]};
RactiveF.templates['ux-off-canvas'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["off-canvas-wrap ",{"t":2,"r":"getExpandedClass"}],"data-offcanvas":0},"f":[{"t":7,"e":"div","a":{"class":"inner-wrap"},"f":[{"t":7,"e":"nav","a":{"class":"tab-bar"},"f":[{"t":4,"f":[{"t":7,"e":"section","a":{"class":"left-small"},"f":[{"t":7,"e":"a","a":{"class":"left-off-canvas-toggle menu-icon","aria-expanded":[{"t":2,"x":{"r":["expandedState"],"s":"_0==\"left\"?\"true\":\"false\""}}]},"v":{"tap":{"n":"updateMenu","a":"left"}},"f":[{"t":7,"e":"span"}]}]}],"n":50,"r":"leftItems"}," ",{"t":7,"e":"section","a":{"class":"middle tab-bar-section"},"f":[{"t":7,"e":"h1","a":{"class":"title"},"f":[{"t":2,"r":"title"}]}]}," ",{"t":4,"f":[{"t":7,"e":"section","a":{"class":"right-small"},"f":[{"t":7,"e":"a","a":{"class":"left-off-canvas-toggle menu-icon","aria-expanded":[{"t":2,"x":{"r":["expandedState"],"s":"_0==\"right\"?\"true\":\"false\""}}]},"v":{"tap":{"n":"updateMenu","a":"right"}},"f":[{"t":7,"e":"span"}]}]}],"n":50,"r":"rightItems"}]}," ",{"t":4,"f":[{"t":7,"e":"aside","a":{"class":"left-off-canvas-menu"},"f":[{"t":7,"e":"ux-off-canvas-list","a":{"items":[{"t":2,"r":"leftItems"}]}}]}],"n":50,"r":"leftItems"}," ",{"t":4,"f":[{"t":7,"e":"aside","a":{"class":"right-off-canvas-menu"},"f":[{"t":7,"e":"ux-off-canvas-list","a":{"items":[{"t":2,"r":"rightItems"}]}}]}],"n":50,"r":"rightItems"}," ",{"t":7,"e":"section","a":{"class":"main-section"},"f":[{"t":4,"f":[{"t":3,"r":"mainContent"}],"n":50,"r":"mainContent"},{"t":4,"n":51,"f":[{"t":16}],"r":"mainContent"}]}," ",{"t":7,"e":"a","a":{"class":"exit-off-canvas"},"v":{"tap":"updateMenu"}}]}]}]};
RactiveF.templates['ux-off-canvas-list'] = {"v":3,"t":[{"t":7,"e":"ul","a":{"class":"off-canvas-list"},"f":[{"t":4,"f":[{"t":7,"e":"li","f":[{"t":4,"f":[{"t":7,"e":"a","a":{"href":[{"t":2,"r":"./href"}]},"m":[{"t":4,"f":["target=\"",{"t":2,"r":"./target"},"\""],"n":50,"r":"./target"}],"f":[{"t":3,"r":"./label"}]}],"n":50,"r":"./href"},{"t":4,"n":51,"f":[{"t":7,"e":"label","f":[{"t":3,"r":"./label"}]}],"r":"./href"}]}],"n":52,"r":"./items"}]}]};
RactiveF.templates['ux-orbit'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":"ux-orbit"},"f":[{"t":7,"e":"div","a":{"class":["orbit-container ",{"t":2,"r":"currentPageCssClass"}]},"f":[{"t":7,"e":"ul","a":{"class":"pageContainer example-orbit orbit-slides-container"},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"li","a":{"class":["orbit-slides-slide ",{"t":4,"f":["active"],"r":"active"}]},"v":{"swipeleft":"nextPage","swiperight":"prevPage"},"f":[{"t":7,"e":"img","a":{"src":[{"t":2,"r":"imagesrc"}],"alt":[{"t":2,"r":"imagealt"}]}}," ",{"t":7,"e":"div","a":{"class":"orbit-caption"},"f":[{"t":2,"r":"caption"}]}]}],"r":"items"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}," ",{"t":4,"f":[{"t":7,"e":"li","a":{"class":"orbit-slides-slide"},"f":[{"t":7,"e":"h2","f":["No slides found"]}]}],"x":{"r":["slidesTotal"],"s":"_0==0"}}]}," ",{"t":4,"f":[{"t":7,"e":"a","a":{"class":"orbit-prev"},"v":{"tap":"prevPage"},"f":["Prev ",{"t":7,"e":"span"}]}," ",{"t":7,"e":"a","a":{"class":"orbit-next"},"v":{"tap":"nextPage"},"f":["Next ",{"t":7,"e":"span"}]}],"n":50,"r":"navigation_arrows"}," ",{"t":4,"f":[{"t":7,"e":"div","a":{"class":"orbit-slide-number"},"f":[{"t":7,"e":"span","f":[{"t":2,"r":"currentPage"}]}," of ",{"t":7,"e":"span","f":[{"t":2,"r":"slidesTotal"}]}]}],"n":50,"r":"slide_number"}]}," ",{"t":4,"f":[{"t":7,"e":"ol","a":{"class":"orbit-bullets"},"f":[{"t":4,"f":[{"t":7,"e":"li","a":{"data-orbit-slide-number":[{"t":2,"r":"i"}],"class":[{"t":4,"f":["active"],"r":"active"}]},"f":[]}],"i":"i","r":"items"}]}],"n":50,"r":"bullets"}]}]};
RactiveF.templates['ux-page-swipe'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["ux-page-swipe ",{"t":2,"r":"isOnPage"}]},"f":[{"t":7,"e":"div","a":{"class":"pageContainer "},"f":[{"t":8,"r":"content"}]}]}]};
RactiveF.templates['ux-panel'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["panel ",{"t":2,"r":"class"}]},"f":[{"t":4,"f":[{"t":2,"r":"text"}],"n":50,"r":"text"},{"t":4,"n":51,"f":[{"t":16}],"r":"text"}]}]};
RactiveF.templates['ux-pricingtable'] = {"v":3,"t":[{"t":7,"e":"ul","a":{"class":"pricing-table"},"f":[{"t":8,"r":"content"}," ",{"t":7,"e":"li","a":{"class":"cta-button"},"f":[{"t":4,"f":[{"t":7,"e":"a","a":{"class":"button disabled","href":"#"},"v":{"tap":"buyNow"},"f":["Coming Soon"]}],"n":50,"x":{"r":["status"],"s":"_0==\"comingsoon\""}}," ",{"t":4,"f":[{"t":7,"e":"a","a":{"class":"button","href":[{"t":2,"r":"href"}]},"v":{"tap":"buyNow"},"f":["Buy Now"]}],"n":50,"x":{"r":["status"],"s":"!_0"}}]}]}]};
RactiveF.templates['ux-progress'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["progress ",{"t":2,"r":"class"}]},"f":[{"t":7,"e":"span","a":{"class":"meter","style":[{"t":2,"r":"meterStyle"}]}}]}]};
RactiveF.templates['ux-row'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["row ",{"t":2,"r":"class"}]},"f":[{"t":16}]}]};
RactiveF.templates['ux-sidenav'] = {"v":3,"t":[{"t":7,"e":"ul","a":{"class":"side-nav","role":"navigation"},"m":[{"t":4,"f":["title=\"",{"t":2,"r":"title"},"\""],"r":"title"}],"f":[{"t":4,"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-li","a":{"class":"heading"},"f":[{"t":2,"r":".label"}]}],"r":"isHeading"}," ",{"t":4,"f":[{"t":7,"e":"ux-li","a":{"class":"divider"}}],"r":"isDivider"}," ",{"t":4,"f":[{"t":7,"e":"ux-li","a":{"class":[{"t":4,"f":["active"],"r":"active"}],"role":"menuitem"},"f":[{"t":7,"e":"a","a":{"href":[{"t":2,"r":".href"}]},"f":[{"t":2,"r":".label"}]}]}],"r":"href"}],"n":52,"r":"items"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}]};
RactiveF.templates['ux-tabarea'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":"tabs-area"},"f":[{"t":4,"f":[{"t":7,"e":"ux-tablinks","f":[{"t":4,"f":[{"t":7,"e":"ux-tablink","a":{"id":[{"t":2,"r":".id"}],"active":[{"t":2,"r":".active"}]},"f":[{"t":2,"r":".title"}]}],"r":"items"}]}," ",{"t":7,"e":"ux-tabpanes","f":[{"t":4,"f":[{"t":7,"e":"ux-tabpane","a":{"datamodel":[{"t":2,"x":{"r":["tabPaneDataModel","."],"s":"_0(_1)"}}]}}],"r":"items"}]}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}]}]};
RactiveF.templates['ux-tablink'] = {"v":3,"t":[{"t":7,"e":"li","a":{"class":["tab-title ",{"t":2,"r":"class"}," ",{"t":4,"f":["active"],"n":50,"r":"active"}],"role":"presentational"},"f":[{"t":7,"e":"a","a":{"href":"#"},"v":{"tap":"changeTab"},"f":[{"t":16}]}]}]};
RactiveF.templates['ux-tablinks'] = {"v":3,"t":[{"t":7,"e":"ul","a":{"class":["tabs ",{"t":4,"f":["vertical"],"r":"vertical"}],"role":"tablist"},"f":[{"t":8,"r":"content"}]}]};
RactiveF.templates['ux-tabpane'] = {"v":3,"t":[{"t":7,"e":"section","a":{"class":["content ",{"t":2,"r":"class"}," ",{"t":4,"f":["active"],"n":50,"r":"active"},{"t":4,"n":51,"f":["hide"],"r":"active"}],"role":"tabpanel","aria-hidden":[{"t":4,"f":["false"],"n":50,"r":"active"},{"t":4,"n":51,"f":["true"],"r":"active"}]},"f":[{"t":4,"f":[{"t":8,"r":"dynamicContent"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}]};
RactiveF.templates['ux-tabpanes'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":"tabs-content"},"f":[{"t":8,"r":"content"}]}]};
RactiveF.templates['ux-top-bar'] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["ux-top-bar ",{"t":4,"f":["fixed"],"n":50,"r":"isfixed"}," ",{"t":2,"r":"class"}]},"f":[{"t":7,"e":"nav","a":{"class":["top-bar ",{"t":4,"f":["expanded"],"n":50,"r":"isexpanded"}],"data-top-bar":0,"role":"navigation","data-options":[{"t":2,"r":"dataoptions"}]},"f":[{"t":7,"e":"ul","a":{"class":"title-area"},"f":[{"t":7,"e":"li","a":{"class":"name"},"f":[{"t":7,"e":"h1","f":[{"t":7,"e":"a","a":{"href":[{"t":2,"r":"href"}]},"f":[{"t":2,"r":"title"}]}]}]}," ",{"t":7,"e":"li","a":{"class":"toggle-topbar menu-icon"},"f":[{"t":7,"e":"a","a":{"href":"#"},"v":{"tap":"toggleMenu"},"f":[{"t":7,"e":"span","f":[{"t":2,"r":"menulabel"}]}]}]}]}," ",{"t":7,"e":"section","a":{"class":"top-bar-section"},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-top-bar-items","a":{"class":"right","items":[{"t":2,"r":"rightitems"}]}}],"n":50,"r":"rightitems"}," ",{"t":4,"f":[{"t":7,"e":"ux-top-bar-items","a":{"class":"left","items":[{"t":2,"r":"leftitems"}]}}],"n":50,"r":"leftitems"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}]}]}]}]};
RactiveF.templates['ux-top-bar-items'] = {"v":3,"t":[{"t":7,"e":"ul","a":{"class":["ux-top-bar-items ",{"t":2,"r":"class"}]},"f":[{"t":4,"f":[{"t":4,"f":[" ",{"t":7,"e":"li","a":{"class":[{"t":2,"x":{"r":["getTopBarItemCssClass","."],"s":"_0(_1)"}}]},"f":[{"t":7,"e":"a","a":{"href":[{"t":2,"r":"./href"}]},"f":[{"t":3,"r":"./label"}]}," ",{"t":4,"f":[" ",{"t":7,"e":"ux-top-bar-items","a":{"class":"dropdown","items":[{"t":2,"r":"./items"}]}}],"n":50,"r":"./items"}]}],"n":52,"r":"items"}],"n":50,"r":"items"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"items"}]}]};
RactiveF.components['ux-accordion'] = Component.extend({

	template: RactiveF.templates['ux-accordion'],

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

			// Stop bubbling.
			return false;

		});

	}

});

RactiveF.components['ux-accordionitem'] = Component.extend({

	template: RactiveF.templates['ux-accordionitem'],

	computed: {
		guid: function () {
			return this._guid;
		}
	},

	oninit: function () {

		var anchorComponent = this.findComponent('ux-anchor');
		var contentComponent = this.findComponent('ux-content');

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

RactiveF.components['ux-anchor'] = Component.extend({
	template: RactiveF.templates['ux-anchor'],
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});

RactiveF.components['ux-button'] = Component.extend({
	template: RactiveF.templates['ux-button'],
	clickHandler: function () {

		// if a click event is specified propagate the click event

		console.log('Button event');

		if (this.get('onclick')) {
			console.log('Firing event');
			this.fire(this.get('onclick'), this);
		}

		// prevent bubbling
		return true;
	}
});

RactiveF.components['ux-col'] = Component.extend({
	template: RactiveF.templates['ux-col']
});

RactiveF.components['ux-content'] = Component.extend({
	template: RactiveF.templates['ux-content'],
	computed: {
		guid: function () {
			return this._guid;
		}
	}
});

RactiveF.components['ux-header'] = Component.extend({
	template: RactiveF.templates['ux-header']
});

RactiveF.components['ux-iconbar'] = Component.extend({

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

	template: RactiveF.templates['ux-iconbar'],

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

RactiveF.components['ux-iconbaritem'] = Component.extend({

	template: RactiveF.templates['ux-iconbaritem'],

	computed: {
		guid: function () {
			return this._guid;
		}
	}

});

RactiveF.components['ux-li'] = Component.extend({
	template: RactiveF.templates['ux-li']
});

RactiveF.components['ux-off-canvas'] = Component.extend({

	template: RactiveF.templates['ux-off-canvas'],

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

	}

});

RactiveF.components['ux-off-canvas-list'] = Component.extend({
	template: RactiveF.templates['ux-off-canvas-list']
});

RactiveF.components['ux-orbit'] = Component.extend({

	template: RactiveF.templates['ux-orbit'],

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
			var nextPage = this.get('currentPage') + 1;
			// FIXME Quick hack for bounds.
			nextPage = nextPage > 5 ? 5 : nextPage;
			this.set('currentPage', nextPage);
			return false;
		});

		this.on('prevPage', function (e) {
			var prevPage = this.get('currentPage') -1 ;
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

RactiveF.components['ux-panel'] = Component.extend({
	template: RactiveF.templates['ux-panel']
});

RactiveF.components['ux-pricingtable'] = Component.extend({
	template: RactiveF.templates['ux-pricingtable'],
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

RactiveF.components['ux-progress'] = Component.extend({
	template: RactiveF.templates['ux-progress'],
	computed: {
		meterStyle: function () {
			return 'width: ' + (this.get('value') || '0') + '%';
		}
	}
});

RactiveF.components['ux-row'] = Component.extend({
	template: RactiveF.templates['ux-row']
});

RactiveF.components['ux-sidenav'] = Component.extend({
	template: RactiveF.templates['ux-sidenav']
});

RactiveF.components['ux-tabarea'] = Component.extend({

	template: RactiveF.templates['ux-tabarea'],

	data: {
		tabPaneDataModel: function (item) {
			return {
				content: item.content
			};
		}
	},

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

RactiveF.components['ux-tablink'] = Component.extend({
	template: RactiveF.templates['ux-tablink'],
	components: RactiveF.components,
	isolated: true,
	oninit: function () {
		var active = this.get('active') || false;
		var tabPane = this.get('tabPane') || null;

		if (tabPane) {
			tabPane.set('active', active);
		}
	}
});

RactiveF.components['ux-tablinks'] = Component.extend({
	template: RactiveF.templates['ux-tablinks'],
	oninit: function () {

		// If there is a hash. We want to check deeplinking.
		if (window.location.hash.length) {
			var hash = window.location.hash.substr(1);
			var components = this.findAllChildComponents('ux-tablink');
			_.each(components, function (component) {
				var isActive = component.get('id') === hash;
				component.set('active', isActive);
				component.get('tabPane').set('active', isActive);
			});

		}

		this.on('*.changeTab', function (event) {
			var components = this.findAllChildComponents('ux-tablink');

			_.each(components, function (component) {
					var isActive = component._guid === event.context.uid;
					component.set('active', isActive);
					component.get('tabPane').set('active', isActive);
			});

			return false;
		});
	}
});

RactiveF.components['ux-tabpane'] = Component.extend({

	template: RactiveF.templates['ux-tabpane'],

	onconfig: function () {
		var datamodel = this.get('datamodel');
		if (datamodel) {
			// For datamodel driven components, the tab content can be html containing more ux components.
			// Therefore, we have to evaluate this, so we do that by injecting a partial here.
			// See http://docs.ractivejs.org/latest/partials#updating
			this.partials.dynamicContent = Ractive.parse(datamodel.content);
		}
	}

});

RactiveF.components['ux-tabpanes'] = Component.extend({
	template: RactiveF.templates['ux-tabpanes']
});

RactiveF.components['ux-top-bar'] = Component.extend({

	template: RactiveF.templates['ux-top-bar'],

	oninit: function () {

		var self = this;

		this.on('toggleMenu', function(e) {

			if (self.get('isexpanded')) {
				self.set('isexpanded', false);
			} else {
				self.set('isexpanded', true);
			}

			return false;

		});

	},

	oncomplete: function () {

		var self = this;
		var topbar = self.find('.top-bar');
		var topbarOffset = RactiveF.elementOffset(topbar);

		window.addEventListener('scroll', function (e) {
			if (self.get('issticky')) {
				self.set('isfixed', RactiveF.pageYOffset() > topbarOffset.top);
			}
		});

	}

});

RactiveF.components['ux-top-bar-items'] = Component.extend({
	template: RactiveF.templates['ux-top-bar-items'],
	data: {
		getTopBarItemCssClass: function (item) {
			var classes = [];
			if (item.active) {
				classes.push('active');
			}
			if (item.hasForm) {
				classes.push('has-form');
			}
			if (item.items && item.items.length > 0) {
				// Note: not-click needed for focus/hover with html class=js. Silly.
				classes.push('has-dropdown not-click');
			}
			return classes.join(' ');
		}
	}
});

/* jshint ignore:end */
	return RactiveF;
});