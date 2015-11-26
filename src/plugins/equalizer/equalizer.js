/*jshint unused:false */
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
