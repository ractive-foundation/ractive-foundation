Ractive.extend({
	template: Ractive.defaults.templates['ux-tooltip'],

	isolated: true,

	decorators: {
		tooltip: /*tooltipDecorator */ function(node, selector, content) {
			// these should ideally be in tooltipDecorator properties,
			// eg tooltip.element, tooltip.className, etc.
			var config_element = 'span',
				config_className = 'tooltip';
				/*,
				config_offsetX = 0,
				config_offsetY = -20;*/

			var tooltip, handlers, eventName;
			handlers = {
				mouseover: function() {
					console.log('mo', node);
					tooltip = document.createElement( config_element );
					tooltip.className = config_className;
					tooltip.id = selector;
					tooltip.innerHTML = content; // ' + '<span class="nub"></span>';

					node.appendChild( tooltip );
					// node.parentNode.insertBefore(tooltip, node);
				},

				/* mousemove: function ( event ) {
					tooltip.style.left = event.clientX + config_offsetX + 'px';
					tooltip.style.top = ( event.clientY - tooltip.clientHeight + config_offsetY ) + 'px';
				},*/

				mouseleave: function () {
					console.log('ml', node);
					tooltip.parentNode.removeChild( tooltip );
				}
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
	},

	computed: {
		guid: function () {
			return this._guid;
		}
	},

	oninit: function () {
		this.on('tooltipHovered', function (srcItem) {
			this.toggle('open');
			return false;
		});
	},

	oncomplete: function () {
		console.log(this);
	}
});