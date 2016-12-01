/**
 * ractive-foundation - Ractive components for Foundation 5
 * @version 0.21.0
 * @link https://github.com/ractive-foundation/ractive-foundation
 * @license MIT
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['ractive', 'lodash-compat'], factory);
    } else if (typeof exports === 'object') {
        factory(require('ractive'), require('lodash-compat'));
    } else {
        factory(root.Ractive, root._);
    }
}(this, function (Ractive, _) {
/* jshint ignore:start */
/*
 * When working with nested components we only want to find child
 * components, not all decendants.
 * @param name
 */
Ractive.defaults.findAllChildComponents = function (name) {
	return _.filter(this.findAllComponents(name), function (component) {
		return this._guid === component.parent._guid;
	}.bind(this));
};

/**
 * If we have a "datamodel" property, that should override any other data.
 * This is now a "data-driven" component.
 * isDataModel is a flag for hbs logic, on whether to use datamodel data or call {{yield}}.
 * @see http://docs.ractivejs.org/latest/ractive-reset
 *
 * TODO Understand the difference between rendering components off the page vs nested inside others.
 * onconstruct has empty opts for the latter.
 */
Ractive.defaults.onconstruct = function (opts) {
	if (opts.data && opts.data.datamodel) {
		var datamodel = _.cloneDeep(opts.data.datamodel);
		datamodel.isDataModel = true;
		opts.data = _.assign(opts.data, datamodel);
		delete opts.data.datamodel;
	}
};

/**
 * For any data-driven component - if something sets 'datamodel', lift that into root scope.
 */
Ractive.defaults.onrender = function () {

	// Wait for parent component to set "datamodel" and then map that back into data again.
	this.observe('datamodel', function (newDataModel) {
		if (newDataModel) {
			// Lift datamodel data into root data scope.
			this.set(newDataModel);
		}
	});

};

/**
 * Get the current coordinates of the given element, relative to the document.
 *
 * Useful for viewport checks etc
 *
 * Use Ractive's this.find(selector) to pass that element in.
 *
 * Helper function for cross-browser element offset.
 * window.pageYOffset is not supported below IE 9.
 */
Ractive.defaults.elementOffset = function (elem) {

	// Defensive code for isomorphic execution.
	if (typeof document === 'undefined' || typeof window === 'undefined') {
		return {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		};
	}

	var box = elem.getBoundingClientRect();

	var body = document.body;
	var docEl = document.documentElement;
	var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	var clientTop = docEl.clientTop || body.clientTop || 0;

	var top = box.top + (scrollTop - clientTop);
	var pageXOffset = window.pageXOffset || document.documentElement.scrollLeft;

	return {
		top: Math.round(top),
		right: Math.round(box.right + pageXOffset),
		bottom: Math.round(box.bottom + top),
		left: Math.round(box.left + pageXOffset)
	};

};

/**
 * IE8 friendly function.
 * TODO Make the return object the same as offset?
 */
Ractive.defaults.pageYOffset = function () {
	// Defensive code for isomorphic execution.
	if (typeof document === 'undefined' || typeof window === 'undefined') {
		return 0;
	}
	return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
};

Ractive.defaults.templates = {};

Ractive.defaults.templates["ux-accordion"] = {"v":3,"t":[{"t":7,"e":"ul","a":{"id":[{"t":2,"r":"guid"}],"class":["accordion ",{"t":2,"r":"class"}],"data-accordion":0},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-accordionitem","a":{"datamodel":[{"t":3,"r":"."}]}}],"n":52,"r":"items"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-accordionitem"] = {"v":3,"t":[{"t":7,"e":"li","a":{"id":[{"t":2,"r":"guid"}],"class":["accordion-navigation ",{"t":2,"r":"class"}," ",{"t":4,"f":["active"],"n":50,"r":"active"}]},"f":[{"t":4,"f":[{"t":7,"e":"ux-anchor","f":[{"t":2,"r":"title"}]}," ",{"t":7,"e":"ux-content","f":[{"t":3,"r":"content"}]}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-alert"] = {"v":3,"t":[{"t":7,"e":"div","a":{"data-alert":0,"class":["alert-box ",{"t":2,"r":"class"}],"aria-live":"assertive","role":"alertdialog"},"f":[{"t":4,"f":[{"t":3,"r":"text"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}," ",{"t":7,"e":"button","a":{"class":"close","aria-label":"Close Alert"},"v":{"tap":"closeClicked"},"f":["×"]}]}]};
Ractive.defaults.templates["ux-anchor"] = {"v":3,"t":[{"t":7,"e":"a","a":{"id":[{"t":2,"r":"guid"}],"class":["ux-anchor ",{"t":2,"r":"class"}]},"m":[{"t":4,"f":["href=\"",{"t":2,"r":"href"},"\""],"n":50,"r":"href"},{"t":4,"f":["role=\"",{"t":2,"r":"role"},"\""],"n":50,"r":"role"},{"t":4,"f":["aria-label=\"",{"t":2,"r":"ariaLabel"},"\""],"n":50,"r":"ariaLabel"},{"t":4,"f":["target=\"",{"t":2,"r":"target"},"\""],"n":50,"r":"target"},{"t":4,"f":["title=\"",{"t":2,"r":"title"},"\""],"n":50,"r":"title"},{"t":4,"f":["tabindex=\"",{"t":2,"x":{"r":["tabindex"],"s":"_0||0"}},"\""],"n":50,"x":{"r":["tabindex"],"s":"_0!==null"}}],"v":{"tap":"anchorClicked"},"f":[{"t":4,"f":[{"t":3,"r":"content"}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}]};
Ractive.defaults.templates["ux-breadcrumb-item"] = {"v":3,"t":[{"t":7,"e":"li","a":{"role":"menuitem","class":[{"t":2,"r":"class"}," ",{"t":4,"f":["unavailable"],"r":"unavailable"}," ",{"t":4,"f":["current"],"r":"current"}]},"f":[{"t":4,"f":[{"t":7,"e":"ux-anchor","a":{"isDataModel":"false","href":[{"t":2,"r":"href"}]},"f":[{"t":2,"r":"content"}]}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}]};
Ractive.defaults.templates["ux-breadcrumbs"] = {"v":3,"t":[{"t":4,"f":[{"t":7,"e":"nav","a":{"class":"breadcrumbs","role":"menubar","aria-label":"breadcrumbs"},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-breadcrumb-item","a":{"datamodel":[{"t":3,"r":"."}]}}],"i":"i","r":"items"}],"n":50,"r":"items"},{"t":4,"n":51,"f":[{"t":16}],"r":"items"}]}],"n":50,"r":"isNav"},{"t":4,"n":51,"f":[{"t":7,"e":"ul","a":{"class":"breadcrumbs"},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-breadcrumb-item","a":{"datamodel":[{"t":3,"r":"."}]}}],"n":52,"r":"items"}],"n":50,"r":"items"},{"t":4,"n":51,"f":[{"t":16}],"r":"items"}]}],"r":"isNav"}]};
Ractive.defaults.templates["ux-button"] = {"v":3,"t":[{"t":4,"f":[{"t":7,"e":"a","a":{"class":["ux-button button ",{"t":2,"r":"class"}]},"m":[{"t":4,"f":["href=\"",{"t":2,"r":"href"},"\""],"n":50,"r":"href"},{"t":4,"f":[" role=\"",{"t":2,"r":"role"},"\""],"n":50,"r":"role"},{"t":4,"f":[" aria-label=\"",{"t":2,"r":"arialabel"},"\""],"n":50,"r":"arialabel"},{"t":4,"f":[" tabindex=\"",{"t":2,"r":"tabindex"},"\""],"n":50,"r":"tabindex"},{"t":4,"f":[" disabled"],"n":50,"r":"isDisabled"}],"v":{"tap":{"m":"clickHandler","a":{"r":[],"s":"[]"}}},"f":[{"t":4,"f":[{"t":3,"r":"text"}],"n":50,"r":"text"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"text"}]}],"n":50,"r":"href"},{"t":4,"n":51,"f":[{"t":7,"e":"button","a":{"class":["ux-button button ",{"t":2,"r":"class"}],"type":[{"t":2,"r":"type"}]},"m":[{"t":4,"f":["role=\"",{"t":2,"r":"role"},"\""],"n":50,"r":"role"},{"t":4,"f":[" aria-label=\"",{"t":2,"r":"arialabel"},"\""],"n":50,"r":"arialabel"},{"t":4,"f":[" tabindex=\"",{"t":2,"r":"tabindex"},"\""],"n":50,"r":"tabindex"},{"t":4,"f":[" disabled"],"n":50,"r":"isDisabled"}],"v":{"tap":{"m":"clickHandler","a":{"r":[],"s":"[]"}}},"f":[{"t":4,"f":[{"t":2,"r":"text"}],"n":50,"r":"text"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"text"}]}],"r":"href"}]};
Ractive.defaults.templates["ux-col"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":[{"t":2,"r":"class"}," columns"]},"f":[{"t":16}]}]};
Ractive.defaults.templates["ux-content"] = {"v":3,"t":[{"t":7,"e":"div","a":{"id":[{"t":2,"r":"guid"}],"class":["content ",{"t":4,"f":["active"],"n":50,"r":"active"}," ",{"t":2,"r":"class"}]},"f":[{"t":16}]}]};
Ractive.defaults.templates["ux-flex-video"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":"ux-flex-video"},"f":[{"t":4,"f":[{"t":7,"e":"div","a":{"class":["flex-video ",{"t":2,"r":"class"}]},"f":[{"t":7,"e":"iframe","a":{"src":[{"t":2,"r":"src"}],"height":[{"t":2,"r":"height"}],"width":[{"t":2,"r":"width"}],"frameborder":[{"t":2,"r":"frameborder"}]},"m":[{"t":4,"f":[{"t":2,"r":"allowfullscreen"}],"r":"allowfullscreen"}],"f":[]}]}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}]};
Ractive.defaults.templates["ux-header"] = {"v":3,"t":[{"t":4,"f":[{"t":7,"e":"h1","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":4,"f":[{"t":3,"r":"content"}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}],"n":50,"x":{"r":["level"],"s":"_0==1"}},{"t":4,"f":[{"t":7,"e":"h2","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":4,"f":[{"t":3,"r":"content"}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}],"n":50,"x":{"r":["level"],"s":"_0==2"}},{"t":4,"f":[{"t":7,"e":"h3","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":4,"f":[{"t":3,"r":"content"}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}],"n":50,"x":{"r":["level"],"s":"_0==3"}},{"t":4,"f":[{"t":7,"e":"h4","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":4,"f":[{"t":3,"r":"content"}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}],"n":50,"x":{"r":["level"],"s":"_0==4"}},{"t":4,"f":[{"t":7,"e":"h5","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":4,"f":[{"t":3,"r":"content"}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}],"n":50,"x":{"r":["level"],"s":"_0==5"}},{"t":4,"f":[{"t":7,"e":"h6","m":[{"t":4,"f":["id=\"",{"t":2,"r":"id"},"\""],"r":"id"},{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"r":"class"}],"f":[{"t":4,"f":[{"t":3,"r":"content"}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}],"n":50,"x":{"r":["level"],"s":"_0==6"}}]};
Ractive.defaults.templates["ux-iconbar"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["icon-bar ",{"t":2,"r":"upNumClass"}," ",{"t":2,"r":"class"}],"role":"navigation"},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-iconbaritem","a":{"datamodel":[{"t":2,"x":{"r":["getItemData","."],"s":"_0(_1)"}}]}}],"r":"items"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-iconbaritem"] = {"v":3,"t":[{"t":7,"e":"a","a":{"href":[{"t":2,"r":"href"}],"class":["item ",{"t":2,"r":"class"}],"tabindex":"0","role":"button"},"m":[{"t":4,"f":["aria-labelledby=\"",{"t":2,"r":"guid"},"\""],"n":50,"r":"labels"},{"t":4,"f":["aria-label=",{"t":2,"r":"arialabel"}],"n":50,"r":"arialabel"}],"f":[{"t":4,"f":[{"t":7,"e":"img","a":{"src":[{"t":2,"r":"src"}]}}],"n":50,"r":"src"}," ",{"t":4,"f":[{"t":7,"e":"label","a":{"id":[{"t":2,"r":"guid"}]},"f":[{"t":4,"f":[{"t":3,"r":"label"}],"n":50,"r":"label"},{"t":4,"n":51,"f":[{"t":16}],"r":"label"}]}],"n":50,"r":"labels"}]}]};
Ractive.defaults.templates["ux-inline-list"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["ux-inline-list ",{"t":2,"r":"class"}]},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-inline-list-item","a":{"datamodel":[{"t":2,"x":{"r":["getItemData","."],"s":"_0(_1)"}}]}}],"r":"items"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-inline-list-item"] = {"v":3,"t":[{"t":7,"e":"li","f":[{"t":7,"e":"a","a":{"href":[{"t":2,"r":"href"}]},"f":[{"t":2,"r":"text"}]}]}]};
Ractive.defaults.templates["ux-keystrokes"] = {"v":3,"t":[{"t":7,"e":"kbd","f":[{"t":4,"f":[{"t":2,"r":"text"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-label"] = {"v":3,"t":[{"t":7,"e":"span","a":{"class":[{"t":2,"r":"class"}," label"]},"f":[{"t":4,"f":[{"t":2,"r":"text"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-li"] = {"v":3,"t":[{"t":7,"e":"li","m":[{"t":4,"f":["class=\"",{"t":2,"r":"class"},"\""],"n":50,"r":"class"},{"t":4,"f":["role=\"",{"t":2,"r":"role"},"\""],"n":50,"r":"role"}],"f":[{"t":16}]}]};
Ractive.defaults.templates["ux-off-canvas"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["off-canvas-wrap ",{"t":2,"r":"getExpandedClass"}," ",{"t":2,"r":"class"}],"data-offcanvas":0},"f":[{"t":7,"e":"div","a":{"class":"inner-wrap"},"f":[{"t":7,"e":"nav","a":{"class":"tab-bar"},"f":[{"t":4,"f":[{"t":7,"e":"section","a":{"class":"left-small"},"f":[{"t":7,"e":"a","a":{"class":"left-off-canvas-toggle menu-icon","aria-expanded":[{"t":2,"x":{"r":["expandedState"],"s":"_0==\"left\"?\"true\":\"false\""}}]},"v":{"tap":{"n":"updateMenu","a":"left"}},"f":[{"t":7,"e":"span"}]}]}],"n":50,"r":"leftItems"}," ",{"t":7,"e":"section","a":{"class":"middle tab-bar-section"},"f":[{"t":7,"e":"h1","a":{"class":"title"},"f":[{"t":2,"r":"title"}]}]}," ",{"t":4,"f":[{"t":7,"e":"section","a":{"class":"right-small"},"f":[{"t":7,"e":"a","a":{"class":"right-off-canvas-toggle menu-icon","aria-expanded":[{"t":2,"x":{"r":["expandedState"],"s":"_0==\"right\"?\"true\":\"false\""}}]},"v":{"tap":{"n":"updateMenu","a":"right"}},"f":[{"t":7,"e":"span"}]}]}],"n":50,"r":"rightItems"}]}," ",{"t":4,"f":[{"t":7,"e":"aside","a":{"class":"left-off-canvas-menu"},"f":[{"t":7,"e":"ux-off-canvas-list","a":{"items":[{"t":2,"r":"leftItems"}]}}]}],"n":50,"r":"leftItems"}," ",{"t":4,"f":[{"t":7,"e":"aside","a":{"class":"right-off-canvas-menu"},"f":[{"t":7,"e":"ux-off-canvas-list","a":{"items":[{"t":2,"r":"rightItems"}]}}]}],"n":50,"r":"rightItems"}," ",{"t":7,"e":"section","a":{"class":"main-section"},"f":[{"t":4,"f":[{"t":3,"r":"mainContent"}],"n":50,"r":"mainContent"},{"t":4,"n":51,"f":[{"t":16}],"r":"mainContent"}]}," ",{"t":7,"e":"a","a":{"class":"exit-off-canvas"},"v":{"tap":"updateMenu"}}]}]}]};
Ractive.defaults.templates["ux-off-canvas-list"] = {"v":3,"t":[{"t":7,"e":"ul","a":{"class":["off-canvas-list ",{"t":2,"r":"class"}]},"f":[{"t":4,"f":[{"t":7,"e":"li","f":[{"t":4,"f":[{"t":7,"e":"a","a":{"href":[{"t":2,"r":"./href"}]},"v":{"tap":"menuSelect"},"m":[{"t":4,"f":["target=\"",{"t":2,"r":"./target"},"\""],"n":50,"r":"./target"}],"f":[{"t":3,"r":"./label"}]}],"n":50,"r":"./href"},{"t":4,"n":51,"f":[{"t":7,"e":"label","f":[{"t":3,"r":"./label"}]}],"r":"./href"}]}],"n":52,"r":"./items"}]}]};
Ractive.defaults.templates["ux-orbit"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["ux-orbit ",{"t":2,"r":"class"}]},"f":[{"t":7,"e":"div","a":{"class":["orbit-container ",{"t":2,"r":"currentPageCssClass"}]},"f":[{"t":7,"e":"ul","a":{"class":"pageContainer example-orbit orbit-slides-container"},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"li","a":{"class":["orbit-slides-slide ",{"t":4,"f":["active"],"n":50,"x":{"r":["i","currentPage"],"s":"_0+1===_1"}}]},"v":{"swipeleft":"nextPage","swiperight":"prevPage"},"f":[{"t":7,"e":"img","a":{"src":[{"t":2,"r":"imagesrc"}],"alt":[{"t":2,"r":"imagealt"}]}}," ",{"t":7,"e":"div","a":{"class":"orbit-caption"},"f":[{"t":2,"r":"caption"}]}]}],"i":"i","r":"items"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}," ",{"t":4,"f":[{"t":7,"e":"li","a":{"class":"orbit-slides-slide"},"f":[{"t":7,"e":"h2","f":["No slides found"]}]}],"x":{"r":["slidesTotal"],"s":"_0==0"}}]}," ",{"t":4,"f":[{"t":7,"e":"a","a":{"class":"orbit-prev"},"v":{"tap":"prevPage"},"f":["Prev ",{"t":7,"e":"span"}]}," ",{"t":7,"e":"a","a":{"class":"orbit-next"},"v":{"tap":"nextPage"},"f":["Next ",{"t":7,"e":"span"}]}],"n":50,"r":"navigation_arrows"}," ",{"t":4,"f":[{"t":7,"e":"div","a":{"class":"orbit-slide-number"},"f":[{"t":7,"e":"span","f":[{"t":2,"r":"currentPage"}]}," of ",{"t":7,"e":"span","f":[{"t":2,"r":"slidesTotal"}]}]}],"n":50,"r":"slide_number"}]}," ",{"t":4,"f":[{"t":7,"e":"ol","a":{"class":"orbit-bullets"},"f":[{"t":4,"f":[{"t":7,"e":"li","a":{"data-orbit-slide-number":[{"t":2,"r":"i"}],"class":[{"t":4,"f":["active"],"n":50,"x":{"r":["i","currentPage"],"s":"_0+1===_1"}}]},"f":[]}],"i":"i","r":"items"}]}],"n":50,"r":"bullets"}]}]};
Ractive.defaults.templates["ux-page-swipe"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["ux-page-swipe ",{"t":2,"r":"isOnPage"}," ",{"t":2,"r":"class"}]},"f":[{"t":7,"e":"div","a":{"class":"pageContainer "},"f":[{"t":8,"r":"content"}]}]}]};
Ractive.defaults.templates["ux-pagination"] = {"v":3,"t":[{"t":7,"e":"ul","a":{"class":"pagination","role":"menubar","aria-label":"Pagination"},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-pagination-page","a":{"isDataModel":"true","tabindex":"0","href":[{"t":2,"r":"href"}],"content":[{"t":2,"r":"content"}]}}],"i":"i","r":"pages"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-pagination-page"] = {"v":3,"t":[{"t":7,"e":"li","a":{"class":[{"t":2,"r":"class"}," ",{"t":4,"f":["arrow"],"r":"arrow"}," ",{"t":4,"f":["current"],"r":"current"}," ",{"t":4,"f":["unavailable"],"r":"unavailable"}]},"m":[{"t":4,"f":["aria-disabled=\"true\""],"r":"unavailable"}],"f":[{"t":4,"f":[{"t":7,"e":"ux-anchor","a":{"href":[{"t":2,"r":"href"}],"target":[{"t":2,"r":"target"}],"title":[{"t":2,"r":"title"}]},"f":[{"t":3,"r":"content"}]}],"n":50,"r":".isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":".isDataModel"}]}]};
Ractive.defaults.templates["ux-panel"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["panel ",{"t":2,"r":"class"}]},"f":[{"t":4,"f":[{"t":2,"r":"text"}],"n":50,"r":"text"},{"t":4,"n":51,"f":[{"t":16}],"r":"text"}]}]};
Ractive.defaults.templates["ux-pricingtable"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":"ux-pricingtable"},"f":[{"t":7,"e":"ul","a":{"class":["pricing-table ",{"t":2,"r":"class"}]},"f":[{"t":4,"f":[{"t":7,"e":"li","a":{"class":"title"},"f":[{"t":2,"r":"title"}]}," ",{"t":7,"e":"li","a":{"class":"price"},"f":[{"t":2,"r":"price"}]}," ",{"t":7,"e":"li","a":{"class":"description"},"f":[{"t":2,"r":"description"}]}," ",{"t":4,"f":[{"t":7,"e":"li","a":{"class":"bullet-item"},"f":[{"t":2,"r":"."}]}],"r":"features"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}," ",{"t":7,"e":"li","a":{"class":"cta-button"},"f":[{"t":4,"f":[{"t":7,"e":"a","a":{"class":"button disabled","href":"#"},"v":{"tap":"buyNow"},"f":["Coming Soon"]}],"n":50,"x":{"r":["status"],"s":"_0==\"comingsoon\""}}," ",{"t":4,"f":[{"t":7,"e":"a","a":{"class":"button","href":[{"t":2,"r":"href"}]},"v":{"tap":"buyNow"},"f":["Buy Now"]}],"n":50,"x":{"r":["status"],"s":"!_0"}}]}]}]}]};
Ractive.defaults.templates["ux-progress"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["progress ",{"t":2,"r":"class"}]},"f":[{"t":4,"f":[{"t":7,"e":"span","a":{"class":["meter ",{"t":2,"r":"class"}],"style":["width:",{"t":2,"r":"value"},"%"]}}],"r":"meters"}]}]};
Ractive.defaults.templates["ux-reveal"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["ux-reveal reveal ",{"t":2,"r":"class"}]},"f":[{"t":7,"e":"a","a":{"target":"_blank","class":"open-reveal-modal"},"v":{"tap":"toggleModal"},"f":[{"t":2,"r":"text"}]}," ",{"t":7,"e":"div","a":{"class":["reveal-modal-bg ",{"t":4,"f":["modal-visible"],"n":50,"r":"modalVisible"}],"aria-hidden":[{"t":2,"r":"modalVisible"}]},"v":{"tap":"closeOnBgClick"},"f":[{"t":7,"e":"div","a":{"class":["reveal-modal ",{"t":2,"r":"size"}," ",{"t":4,"f":["modal-visible"],"n":50,"r":"modalVisible"}],"aria-hidden":[{"t":2,"r":"modalVisible"}]},"v":{"tap":"innerClick"},"f":[{"t":4,"f":[{"t":3,"r":"content"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}," ",{"t":4,"f":[{"t":7,"e":"a","a":{"class":"close-reveal-modal","target":"_blank"},"v":{"tap":"toggleModal"},"f":[{"t":3,"r":"closetext"}]}],"n":50,"x":{"r":["hideCloseButton"],"s":"!_0"}}]}]}]}]};
Ractive.defaults.templates["ux-row"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["row ",{"t":2,"r":"class"}]},"f":[{"t":16}]}]};
Ractive.defaults.templates["ux-sidenav"] = {"v":3,"t":[{"t":7,"e":"ul","a":{"class":["side-nav ",{"t":2,"r":"class"}],"role":"menu"},"m":[{"t":4,"f":["title=\"",{"t":2,"r":"title"},"\""],"r":"title"}],"f":[{"t":4,"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-li","a":{"class":["heading ",{"t":2,"r":"class"}]},"f":[{"t":2,"r":".label"}]}],"r":"isHeading"}," ",{"t":4,"f":[{"t":7,"e":"ux-li","a":{"class":["divider ",{"t":2,"r":"class"}]}}],"r":"isDivider"}," ",{"t":4,"f":[{"t":7,"e":"ux-li","a":{"class":[{"t":4,"f":["active"],"r":"active"}," ",{"t":2,"r":"class"}],"role":"menuitem"},"f":[{"t":7,"e":"a","a":{"href":[{"t":2,"r":".href"}]},"f":[{"t":2,"r":".label"}]}]}],"r":"href"}],"n":52,"r":"items"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-sub-nav"] = {"v":3,"t":[{"t":7,"e":"dl","a":{"class":["sub-nav ux-sub-nav ",{"t":2,"r":"class"}],"role":"menu","title":[{"t":2,"r":"title"},"Menu List"]},"f":[{"t":7,"e":"dt","f":[{"t":4,"f":[{"t":2,"r":"title"},":"],"r":"title"}]}," ",{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"dd","a":{"role":"menuitem","class":[{"t":4,"f":["active"],"r":"active"}]},"f":[{"t":7,"e":"ux-anchor","a":{"href":[{"t":2,"r":"href"}],"class":[{"t":2,"r":"class"}]},"f":[{"t":3,"r":"content"}]}]}],"i":"i","r":"items"}],"n":50,"r":"items.length"},{"t":4,"n":51,"f":[{"t":16}],"r":"items.length"}]}]};
Ractive.defaults.templates["ux-switch"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["switch ",{"t":2,"r":"class"}]},"m":[{"t":4,"f":["role=\"",{"t":2,"r":"role"},"\""],"n":50,"r":"role"},{"t":4,"f":[" aria-label=\"",{"t":2,"r":"arialabel"},"\""],"n":50,"r":"arialabel"},{"t":4,"f":[" tabindex=\"",{"t":2,"r":"tabindex"},"\""],"n":50,"r":"tabindex"}],"v":{"tap":"clickHandler"},"f":[{"t":7,"e":"input","m":[{"t":4,"f":["type=\"radio\" group=\"",{"t":2,"r":"group"},"\""],"n":50,"r":"group"},{"t":4,"n":51,"f":["type=\"checkbox\""],"r":"group"},{"t":4,"f":[" name=\"",{"t":2,"r":"name"},"\""],"n":50,"r":"name"}],"a":{"checked":[{"t":2,"r":"checked"}]}}," ",{"t":7,"e":"label"}]}]};
Ractive.defaults.templates["ux-tabarea"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["tabs-area ",{"t":2,"r":"class"}]},"f":[{"t":4,"f":[{"t":7,"e":"ux-tablinks","a":{"items":[{"t":2,"r":"items"}]},"f":[{"t":4,"f":[{"t":7,"e":"ux-tablink","a":{"id":[{"t":2,"r":".id"}],"active":[{"t":2,"r":".active"}]},"f":[{"t":2,"r":".title"}]}],"n":52,"r":"items"}]}," ",{"t":7,"e":"ux-tabpanes","a":{"items":[{"t":2,"r":"items"}]},"f":[{"t":4,"f":[{"t":7,"e":"ux-tabpane","f":[{"t":3,"r":".content"}]}],"n":52,"r":"items"}]}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-table"] = {"v":3,"t":[{"t":7,"e":"table","a":{"class":["ux-table ",{"t":2,"r":".class"}]},"m":[{"t":4,"f":["role=\"",{"t":2,"r":"role"},"\""],"n":50,"r":"role"}],"f":[{"t":4,"f":[{"t":7,"e":"caption","f":[{"t":3,"r":".caption"}]}],"n":50,"r":".caption"}," ",{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"thead","m":[{"t":4,"f":["class=\"",{"t":2,"r":".header.class"},"\""],"n":50,"r":".header.class"}],"f":[{"t":7,"e":"tr","f":[{"t":4,"f":[{"t":7,"e":"th","m":[{"t":4,"f":["id=\"",{"t":2,"r":".id"},"\""],"n":50,"r":".id"},{"t":4,"f":["scope=\"",{"t":2,"r":".scope"},"\""],"n":50,"r":".scope"},{"t":4,"f":["width=\"",{"t":2,"r":".width"},"\""],"n":50,"r":".width"},{"t":4,"f":["height=\"",{"t":2,"r":".height"},"\""],"n":50,"r":".height"},{"t":4,"f":["colspan=\"",{"t":2,"r":".colspan"},"\""],"n":50,"r":".colspan"},{"t":4,"f":["rowspan=\"",{"t":2,"r":".rowspan"},"\""],"n":50,"r":".rowspan"},{"t":4,"f":["headers=\"",{"t":2,"r":".headers"},"\""],"n":50,"r":".headers"},{"t":4,"f":["class=\"",{"t":2,"r":".class"},"\""],"n":50,"r":".class"}],"f":[{"t":3,"r":".label"}]}],"n":52,"r":".header.cell"}]}]}],"n":50,"r":".header"}," ",{"t":4,"f":[{"t":7,"e":"tbody","m":[{"t":4,"f":["class=\"",{"t":2,"r":".body.class"},"\""],"n":50,"r":".body.class"}],"f":[{"t":4,"f":[{"t":7,"e":"tr","m":[{"t":4,"f":["class=\"",{"t":2,"r":".class"},"\""],"n":50,"r":".class"}],"f":[{"t":4,"f":[{"t":7,"e":"td","m":[{"t":4,"f":["id=\"",{"t":2,"r":".id"},"\""],"n":50,"r":".id"},{"t":4,"f":["scope=\"",{"t":2,"r":".scope"},"\""],"n":50,"r":".scope"},{"t":4,"f":["width=\"",{"t":2,"r":".width"},"\""],"n":50,"r":".width"},{"t":4,"f":["height=\"",{"t":2,"r":".height"},"\""],"n":50,"r":".height"},{"t":4,"f":["colspan=\"",{"t":2,"r":".colspan"},"\""],"n":50,"r":".colspan"},{"t":4,"f":["rowspan=\"",{"t":2,"r":".rowspan"},"\""],"n":50,"r":".rowspan"},{"t":4,"f":["headers=\"",{"t":2,"r":".headers"},"\""],"n":50,"r":".headers"},{"t":4,"f":["class=\"",{"t":2,"r":".class"},"\""],"n":50,"r":".class"}],"f":[{"t":3,"r":".label"}]}],"n":52,"r":".cell"}]}],"n":52,"r":".body.rows"}]}],"n":50,"r":".body"}," ",{"t":4,"f":[{"t":7,"e":"tfoot","m":[{"t":4,"f":["class=\"",{"t":2,"r":".footer.class"},"\""],"n":50,"r":".footer.class"}],"f":[{"t":7,"e":"tr","f":[{"t":4,"f":[{"t":7,"e":"td","m":[{"t":4,"f":["id=\"",{"t":2,"r":".id"},"\""],"n":50,"r":".id"},{"t":4,"f":["scope=\"",{"t":2,"r":".scope"},"\""],"n":50,"r":".scope"},{"t":4,"f":["width=\"",{"t":2,"r":".width"},"\""],"n":50,"r":".width"},{"t":4,"f":["height=\"",{"t":2,"r":".height"},"\""],"n":50,"r":".height"},{"t":4,"f":["colspan=\"",{"t":2,"r":".colspan"},"\""],"n":50,"r":".colspan"},{"t":4,"f":["rowspan=\"",{"t":2,"r":".rowspan"},"\""],"n":50,"r":".rowspan"},{"t":4,"f":["headers=\"",{"t":2,"r":".headers"},"\""],"n":50,"r":".headers"},{"t":4,"f":["class=\"",{"t":2,"r":".class"},"\""],"n":50,"r":".class"}],"f":[{"t":3,"r":".label"}]}],"n":52,"r":".footer.cell"}]}]}],"n":50,"r":".footer"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-tablink"] = {"v":3,"t":[{"t":7,"e":"li","a":{"class":["tab-title ",{"t":2,"r":".class"}," ",{"t":4,"f":["active"],"n":50,"r":".active"}],"role":"presentational"},"f":[{"t":7,"e":"a","a":{"href":["#",{"t":2,"r":".id"}]},"v":{"tap":"changeTab"},"f":[{"t":16}]}]}]};
Ractive.defaults.templates["ux-tablinks"] = {"v":3,"t":[{"t":7,"e":"ul","a":{"class":["tabs ",{"t":4,"f":["vertical"],"r":"vertical"}," ",{"t":2,"r":"class"}],"role":"tablist"},"f":[{"t":8,"r":"content"}]}]};
Ractive.defaults.templates["ux-tabpane"] = {"v":3,"t":[{"t":7,"e":"section","a":{"class":["content ",{"t":2,"r":"class"}," ",{"t":4,"f":["active"],"n":50,"r":"active"},{"t":4,"n":51,"f":["hide"],"r":"active"}],"role":"tabpanel","aria-hidden":[{"t":4,"f":["false"],"n":50,"r":"active"},{"t":4,"n":51,"f":["true"],"r":"active"}]},"f":[{"t":16}]}]};
Ractive.defaults.templates["ux-tabpanes"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["tabs-content ",{"t":2,"r":"class"}]},"f":[{"t":8,"r":"content"}]}]};
Ractive.defaults.templates["ux-thumbnail"] = {"v":3,"t":[{"t":7,"e":"a","a":{"class":"th","role":"button","aria-label":"Thumbnail","href":[{"t":2,"r":"href"}]},"f":[{"t":7,"e":"img","a":{"aria-hidden":"true","src":[{"t":2,"r":"src"}]}}]}]};
Ractive.defaults.templates["ux-tooltip"] = {"v":3,"t":["This is just a normal text but ",{"t":7,"e":"span","o":{"n":"tooltip","d":[{"t":2,"r":"."}]},"a":{"tabindex":"0"},"f":[{"t":7,"e":"strong","f":["here"]}]}," is a tooltip."]};
Ractive.defaults.templates["ux-top-bar"] = {"v":3,"t":[{"t":7,"e":"div","a":{"class":["ux-top-bar ",{"t":4,"f":["fixed"],"n":50,"r":"isfixed"}," ",{"t":2,"r":"class"}]},"f":[{"t":7,"e":"nav","a":{"class":["top-bar ",{"t":4,"f":["expanded"],"n":50,"r":"isexpanded"}],"data-top-bar":0,"role":"navigation","data-options":[{"t":2,"r":"dataoptions"}]},"f":[{"t":4,"f":[{"t":7,"e":"ul","a":{"class":"title-area"},"f":[{"t":7,"e":"li","a":{"class":"name"},"f":[{"t":7,"e":"h1","f":[{"t":7,"e":"a","a":{"href":[{"t":2,"r":"href"}]},"f":[{"t":2,"r":"title"}]}]}]}," ",{"t":7,"e":"li","a":{"class":"toggle-topbar menu-icon"},"f":[{"t":7,"e":"a","a":{"href":"#"},"v":{"tap":"toggleMenu"},"f":[{"t":7,"e":"span","f":[{"t":2,"r":"menulabel"}]}]}]}]}],"n":50,"r":"menulabel"}," ",{"t":7,"e":"section","a":{"class":"top-bar-section"},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-top-bar-items","a":{"class":"right","items":[{"t":2,"r":"rightitems"}]}}],"n":50,"r":"rightitems"}," ",{"t":4,"f":[{"t":7,"e":"ux-top-bar-items","a":{"class":"left","items":[{"t":2,"r":"leftitems"}]}}],"n":50,"r":"leftitems"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"isDataModel"}]}]}]}]};
Ractive.defaults.templates["ux-top-bar-item"] = {"v":3,"t":[{"t":7,"e":"li","a":{"class":[{"t":2,"r":"topBarItemCssClass"}]},"f":[{"t":4,"f":[" ",{"t":7,"e":"ux-anchor","a":{"href":[{"t":2,"r":"href"}]},"f":[{"t":3,"r":"label"}]}," ",{"t":4,"f":[" ",{"t":7,"e":"ux-top-bar-items","a":{"class":"dropdown","items":[{"t":2,"r":"items"}]}}],"n":50,"r":"items"}],"n":50,"r":"isDataModel"},{"t":4,"n":51,"f":[{"t":16}],"r":"isDataModel"}]}]};
Ractive.defaults.templates["ux-top-bar-items"] = {"v":3,"t":[{"t":7,"e":"ul","a":{"class":["ux-top-bar-items ",{"t":2,"r":"class"}]},"f":[{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"ux-top-bar-item","a":{"datamodel":[{"t":3,"r":"."}]}}],"n":52,"r":"items"}],"n":50,"r":"items"},{"t":4,"n":51,"f":[{"t":8,"r":"content"}],"r":"items"}]}]};
Ractive.transitions.equalizer = /*jshint unused:false */
/*jshint -W025 */

function(t) {

	if (t.isIntro) {
		var node = t.node,
			parent = t.root.el,
			identifier = t.node.attributes['data-equalizer-watcher'].value;

		// find parent
		while (node !== null) {
			node = node.parentElement;
			if (node !== null &&
				node.attributes['data-equalizer'] &&
				node.attributes['data-equalizer'].value === identifier) {

				parent = node;
				node = null;
			}
		}
		var listeners = parent.querySelectorAll('[data-equalizer-watcher="' + identifier + '"]');
		var max = _.max(listeners, function(listener) {
			return listener.offsetHeight;
		});

		if (max) {
			t.setStyle('height', max.offsetHeight  + 'px');
		}

		t.complete(true);
	}
}

Ractive.decorators.tooltip = /*jshint unused:false */
/*jshint -W025 */

function(node, options) {
	var tooltip, handlers, eventName, enterSection, leaveSection,
		config = {
			tagElement: options.tagElement || 'span',
			className: options.className || 'tooltip',
			selectorName: options.selectorName || 'tooltip' + Math.floor((Math.random() * 1000000000000000) + 1),
			content: options.content || '',
			delay: options.delay || 0,
			show_on: options.show_on || 'small medium large'
		};

	enterSection = function() {
		var tooltip_exists = document.getElementById(config.selectorName);
		if (tooltip_exists || !config.content.length) {
			return;
		}

		node.setAttribute('aria-haspopup', 'true');
		node.setAttribute('aria-describedby', config.selectorName);
		node.className = node.className + ' ux-tooltip ' + config.show_on;

		tooltip = document.createElement(config.tagElement);
		tooltip.id = config.selectorName;
		tooltip.className = config.className;
		tooltip.setAttribute('role', 'tooltip');
		tooltip.innerHTML = config.content;

		if (config.delay) {
			// for screen-reader accessibility purposes
			tooltip.setAttribute('style', 'left:-100000px;');
		}

		node.appendChild(tooltip);

		tooltip.addEventListener('click', leaveSection);

		setTimeout(function () {
			tooltip.setAttribute('style', 'left:inherit;');
		}, config.delay);
	};

	leaveSection = function () {
		if (tooltip && tooltip.parentNode) {
			tooltip.parentNode.className = tooltip.parentNode.className.replace(' ux-tooltip ' + config.show_on, '');
			tooltip.parentNode.removeChild(tooltip);
		}
	};

	handlers = {
		mouseover: enterSection,
		focus: enterSection,

		mouseleave: leaveSection,
		blur: leaveSection
	};

	for (eventName in handlers) {
		if (handlers.hasOwnProperty(eventName)) {
			node.addEventListener(eventName, handlers[eventName]);
		}
	}

	return {
		teardown: function () {
			for (eventName in handlers) {
				if (handlers.hasOwnProperty(eventName)) {
					node.removeEventListener(eventName, handlers[ eventName ]);
				}
			}
		}
	};
}

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

	oninit: function () {
		this.on('toggleModal', function (e) {
			this.toggle('modalVisible');
			this.fire('toggleReveal', e);
			return false;
		});

		this.on('innerClick', function (e) {
			// captures clicks inside the modal, to prevent event propagation from closing the modal.
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
	template: Ractive.defaults.templates['ux-tooltip']
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

/* jshint ignore:end */
}));