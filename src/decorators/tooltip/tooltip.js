/*jshint unused:false */
/*jshint -W025 */

function(node, options) {
	var tooltip, handlers, eventName, enterSection, leaveSection,
		config = {
			tagElement: options.tagElement || 'span',
			className: options.className || 'tooltip',
			selectorName: options.selectorName || 'tooltip' + Math.floor((Math.random() * 1000) + 1),
			content: options.content || ''
		};
	
	enterSection = function() {

		var tooltip_exists = document.getElementById(config.selectorName);
		if (!tooltip_exists) {
			node.setAttribute('aria-haspopup', 'true');
			node.setAttribute('aria-describedby', config.selectorName);

			tooltip = document.createElement( config.tagElement );
			tooltip.id = config.selectorName;
			tooltip.className = config.className;
			tooltip.setAttribute('role','tooltip');
			tooltip.innerHTML = config.content; // ' + '<span class="nub"></span>';

			node.appendChild( tooltip );
		}
	};

	leaveSection = function () {
		tooltip.parentNode.removeChild( tooltip );
	};
	
	handlers = {
		mouseover: enterSection,
		focus: enterSection,

		mouseleave: leaveSection,
		blur: leaveSection
	};

	for ( eventName in handlers ) {
		if (handlers.hasOwnProperty(eventName)) {
			node.addEventListener(eventName, handlers[eventName], false);
		}
	}

	return {
		teardown: function () {
			for ( eventName in handlers ) {
				if ( handlers.hasOwnProperty( eventName ) ) {
					node.removeEventListener( eventName, handlers[ eventName ], false );
				}
			}
		}
	};
}