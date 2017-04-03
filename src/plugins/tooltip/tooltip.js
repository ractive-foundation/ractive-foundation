/*jshint unused:false */
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

		if (!tooltip) {
			tooltip = document.createElement(config.tagElement);
			tooltip.id = config.selectorName;
			tooltip.className = config.className;
			tooltip.setAttribute('role', 'tooltip');
			tooltip.setAttribute('style', 'display: block');
			tooltip.innerHTML = config.content;
			//to pick foundation nub styles
			var nub = document.createElement('span');
			nub.className = 'nub';

			tooltip.appendChild(nub);
		}

		if (config.delay) {
			// for screen-reader accessibility purposes
			tooltip.setAttribute('style', 'left:-100000px;display: block;');
		}
		//node.nextSibling will return 'null' if node is last element
		//insertBefore appends given child as last child if second param is null
		node.parentNode.insertBefore(tooltip, node.nextSibling);

		tooltip.addEventListener('click', leaveSection);

		var nodeLeftVal = node.offsetLeft;
		var tooltipLeftValue;

		if (nodeLeftVal) {
			if (node.offsetWidth < 10 ) {
				tooltipLeftValue = nodeLeftVal - 5;
			} else {
				tooltipLeftValue = nodeLeftVal;
			}
		}

		setTimeout(function () {
			tooltip.setAttribute('style', 'left:'+ tooltipLeftValue +'px;display: block;');
		}, config.delay);
	};

	leaveSection = function () {
		var tooltipConfigElement = tooltip.parentNode ? tooltip.parentNode.querySelector('.ux-tooltip') : '';
		if (tooltip && tooltipConfigElement) {
			tooltipConfigElement.className = tooltipConfigElement.className.replace(' ux-tooltip ' +
				config.show_on, '');
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
