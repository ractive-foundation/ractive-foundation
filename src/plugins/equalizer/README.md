> The equalizer will calculate the maximum height of a group of elements and apply the height to all elements

See [Foundation's equalizer.html docs](http://foundation.zurb.com/docs/components/equalizer.html) for details.
Media query functionality not provided.
Images or the wrapper element of responsive images must have a fixed height as the equalizer can be triggered before image downloads are completed.

Transitions are only triggered when the node is added so window resize and orientation change events need to toggle a switch which would result in the equalized elements being removed then reinstated by the template.

For example toggle reflow

this.ractive.set('reflow', false).then(function() {
	this.ractive.set('reflow', true);
}.bind(this));
