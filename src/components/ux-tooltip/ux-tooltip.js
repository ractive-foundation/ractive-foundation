Ractive.extend({
	template: Ractive.defaults.templates['ux-tooltip'],

	isolated: true,

	decorators: {
		tooltip: /*tooltipDecorator */ function(node, content) {
			// this is supposed to be in tooltipDecorator, eg tooltip.element, tooltip.className, etc.
			var config_element = 'span',
				config_className = 'tooltip',
				config_offsetX = 0,
				config_offsetY = -20;

			var tooltip, handlers, eventName;
			handlers = {
				mouseover: function() {
					tooltip = document.createElement( config_element );
					tooltip.className = config_className;
					tooltip.textContent = content;

					node.parentNode.insertBefore( tooltip, node );
				},

				mousemove: function ( event ) {
					tooltip.style.left = event.clientX + config_offsetX + 'px';
					tooltip.style.top = ( event.clientY - tooltip.clientHeight + config_offsetY ) + 'px';
				},

				mouseleave: function () {
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

	oninit: function (options) {

		this.on('tooltipHovered', function (srcItem) {
			this.toggle('open');
			/*
			console.log(this);
			console.log(srcItem);

			var attrs = srcItem.node.attributes,
				selector = attrs['data-selector'].value,
				content = attrs['data-content'].value;
			var tooltip = this.decorators.tooltip.settings.tip_template(selector, content);
			*/
			return false;
		});
	}
});