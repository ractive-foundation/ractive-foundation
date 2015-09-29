Ractive.extend({
	template: Ractive.defaults.templates['ux-tooltip'],

    isolated: true,

    oninit: function () {

        this.on('tooltipHovered', function (item) {
            item.toggle('open');
        }.bind(this));

    }
});
