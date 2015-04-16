/*global page, superagent*/
page.base('/testRunner.html');
page('/component/:name/use-case/:useCase', function (ctx) {
	var params = ctx.params;
	var url = ['/use-cases/', params.name, '/', params.useCase, '.json'];

	superagent.get(url.join(''), function (err, res) {

		window.currentComponent = new Ractive({
			el: '#childComponent',
			template: '<child-component></child-component>',
			components: {
				'child-component': RactiveF.components[params.name]
			},
			onrender: function () {
				this
					.findComponent('child-component')
					.set( _.extend(res.body.data, {
						isDataModel: true
					})
				);
			}
		});

	});
});
page({
	hashbang: true
});
