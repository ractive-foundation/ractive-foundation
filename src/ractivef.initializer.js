/*global hljs*/
if (typeof document !== 'undefined') {

	document.addEventListener('DOMContentLoaded', function () {

		var codeBlocks = document.querySelectorAll('pre code');

		if (_ && _.each && _.escape && hljs && hljs.highlightBlock) {
			_.each(codeBlocks, function (block) {
				block.innerHTML = _.escape(block.innerHTML);
				hljs.highlightBlock(block);
			});
		} else {
			console.warn('Failed to enable syntax highlight.');
		}

		var containers = document.querySelectorAll('.ractivef');

		for (var i = 0; i < containers.length; i++) {
			var instance = RactiveF.initInstance(containers[i]);
			RactiveF.widgets.push(instance);
		}

	});

}