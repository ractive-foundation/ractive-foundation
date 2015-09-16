/*global page, superagent*/
page.base('/testRunner.html');
page('/component/:name/use-case/:useCase', function (ctx) {
	var params = ctx.params;
	var url = ['/use-cases/', params.name, '/', params.useCase, '.json'];

	superagent.get(url.join(''), function (err, res) {

		window.currentComponent = new Ractive.components[params.name]({
			el: '#childComponent',
			data: function () {
				var data = res.body && res.body.data || {};
				return _.extend(data, {
					isDataModel: true
				});
			}
		});

	});
});
page({
	hashbang: true
});
