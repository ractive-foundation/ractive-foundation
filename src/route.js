page.base('/test.html')
page('/component/:name/use-case/:useCase', function (ctx) {
	var params = ctx.params;
	var url = ['/mocks/', params.name, '/use_cases/', params.useCase, '.json'];

	superagent.get(url.join(''), function (err, res) {
		window.currentComponent = new RactiveF.components[params.name]({
			el: '.ractivef',
			data: res.body
		});
	});
});
page({
	hashbang: true
});
