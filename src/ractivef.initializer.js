/*helpers*/
_.extend(RactiveF, {

	initInstance: function (el, options) {
		el = typeof el === 'string' ? document.querySelector(el) : el;

		options = options || {};

		var defaults = {
			el: el,
			template: Ractive.parse(el.innerHTML),
			onrender: function () {
				this.el.classList.remove('hide');
				this.el.classList.add('initialize');
			}
		};

		options = _.extend(defaults, options);

		var instance = this.forge(options);

		instance.on('*.*', RactiveF.genericEventHandler);

		instance.set('dataModel', '{{dataModel}}');

		return instance;
	},

	genericEventHandler: function (origin) {

		// list of events below copied from Ractive source code v0.7.1
		// Filtering out ractive lifecycle events to not pollute log output.
		var reservedEventNames =
				/^(?:change|complete|reset|teardown|update|construct|config|init|render|unrender|detach|insert)$/;

		if (!reservedEventNames.test(this.event.name)) {
			console.log('Event', this.event.name);
			console.log('Event handler arguments', origin);

			var eventName = 'events.' + origin.get('uid');
			if (!this.get(eventName)) {
				this.set(eventName, []);
			}
			this.push(eventName, this.event.name);
		}

	},

	/**
	 * Get the current coordinates of the given element, relative to the document.
	 *
	 * Useful for viewport checks etc
	 *
	 * Use Ractive's this.find(selector) to pass that element in.
	 *
	 * Helper function for cross-browser element offset.
	 * window.pageYOffset is not supported below IE 9.
	 *
	 * FIXME Where should this belong?
	 */
	elementOffset: function (elem) {

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

	},

	/**
	 * IE8 friendly function.
	 * TODO Make the return object the same as offset?
	 */
	pageYOffset: function () {
		return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
	}
});

/*global hljs*/
if (typeof document !== 'undefined') {

	document.addEventListener('DOMContentLoaded', function () {

		var codeBlocks = document.querySelectorAll('pre code');

		try {
			_.each(codeBlocks, function (block) {
				block.innerHTML = _.escape(block.innerHTML);
				hljs.highlightBlock(block);
			});
		} catch (err) {
			console.warn('Failed to enable syntax highlight, err:', err);
		}

		var containers = document.querySelectorAll('.ractivef');
		RactiveF.widgets = [];

		for (var i = 0; i < containers.length; i++) {
			var instance = RactiveF.initInstance(containers[i]);

			RactiveF.widgets.push(instance);
		}

	});

}
