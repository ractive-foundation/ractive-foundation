/*jshint unused:false */
/*jshint -W025 */

function(t) {

	if (t.isIntro) {
		var node = t.node,
			parent = t.ractive.el,
			identifier = t.node.attributes['data-equalizer-watcher'].value;

		// find parent
		while (node !== null) {
			node = node.parentElement;
			debugger;
			if (node !== null &&
				node.attributes['data-equalizer'] &&
				node.attributes['data-equalizer'].value === identifier) {

				parent = node;
				node = null;
			}
		}
		var listeners = parent.querySelectorAll('[data-equalizer-watcher="' + identifier + '"]');
		var max = _.max(listeners, function(listener) {
			return listener.clientHeight;
		});

		if (max) {
			var height = max.clientHeight;

			// compensate for any padding in the box model
			var padding = t.getStyle('padding-top');
			if (isNaN(padding)) {
				height -= padding.replace('px', '');
			}
			padding = t.getStyle('padding-bottom');
			if (isNaN(padding)) {
				height -= padding.replace('px', '');
			}

			t.setStyle('height', height  + 'px');
		}

		t.complete(true);
	}
}			