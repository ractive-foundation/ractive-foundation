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
			// trigger notification
			var event = document.createEvent('Event');
			// passing the instance
			event.instance = instance;
			// Define that the event name is 'component-init'
			event.initEvent('widget-init', true, true);
			// target can be any Element or other EventTarget
			document.dispatchEvent(event);
		}

	});

}

/* jscs:disable */
/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-76172710-1', 'auto');
ga('send', 'pageview');
/* jshint ignore:end */
/* jscs:enable */
