/*helpers*/
RactiveF = {

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

		var instance = new Ractive(options);

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

	}

};

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
