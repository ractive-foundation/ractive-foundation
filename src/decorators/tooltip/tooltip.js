/*jshint unused:false */
/*jshint -W025 */

function(node, selector, content) {
	// these should ideally be in tooltipDecorator properties,
	// eg tooltip.element, tooltip.className, etc.
	var config_element = 'span',
		config_className = 'tooltip';
		/*,
		config_offsetX = 0,
		config_offsetY = -20;*/

	var tooltip, handlers, eventName, inSection, outSection;
	
	inSection = function() {
		console.log('mo', node);
		
		tooltip = document.createElement( config_element );
		tooltip.className = config_className;
		tooltip.id = selector;
		tooltip.innerHTML = content; // ' + '<span class="nub"></span>';

		node.appendChild( tooltip );
		// node.parentNode.insertBefore(tooltip, node);
	};
	
	outSection = function () {
		console.log('ml', node);
		tooltip.parentNode.removeChild( tooltip );
	};
	
	handlers = {
		mouseover: inSection,
		focus: inSection,

		/* mousemove: function ( event ) {
			tooltip.style.left = event.clientX + config_offsetX + 'px';
			tooltip.style.top = ( event.clientY - tooltip.clientHeight + config_offsetY ) + 'px';
		},*/

		mouseleave: outSection,
		blur: outSection
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