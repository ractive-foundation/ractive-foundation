page.base('/test.html')
page('/component/:name/use-case/:useCase', function (ctx) {
	var params = ctx.params;
	var url = ['/use-cases/', params.name, '/', params.useCase, '.json'];

	superagent.get(url.join(''), function (err, res) {
		window.currentComponent = new RactiveF.components[params.name]({
			el: '.ractivef',
			data: function () {
				return res.body;
			},
			template: function (parser) {
				return parser.parse('<' + params.name + "/>");
			}
		});
	});
});
page({
	hashbang: true
});
