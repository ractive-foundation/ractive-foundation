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
			tagElement  : options.tagElement || 'span',
			className   : options.className  || 'tooltip',
			selectorName: options.selectorName || 'tooltip' + Math.floor((Math.random() * 1000000000000000) + 1),
			content     : options.content || '',
			delay       : options.delay   || 0,
			show_on     : options.show_on || 'small medium large'
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
