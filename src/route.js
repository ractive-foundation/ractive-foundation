/*global page, superagent*/
page.base('/testRunner.html');
page('/component/:name/use-case/:useCase', function (ctx) {
	var params = ctx.params;
	var url = ['/use-cases/', params.name, '/', params.useCase, '.json'];

	superagent.get(url.join(''), function (err, res) {
		var data = res.body && res.body.data || {},
			config = {
				el: '#childComponent',
				data: function () {
					return _.extend(data, {
						isDataModel: true
					});
				}
			};
		if (res.body && res.body.template) {
			config.template = Ractive.defaults.templates[res.body.template];
			window.currentComponent = new Ractive(config);
		} else {
			window.currentComponent = new Ractive.components[params.name](config);
		}

	});
});
page('/plugin/:name/use-case/:useCase', function (ctx) {
	var params = ctx.params;
	var url = ['/use-cases/', params.name, '/', params.useCase, '.json'];

	superagent.get(url.join(''), function (err, res) {
		var data = res.body && res.body.data || {},
			config = {
				el: '#template',
				data: function () {
					return _.extend(data, {
						isDataModel: true
					});
				}
			};
		config.template = Ractive.defaults.templates[res.body.template];
		window.currentTemplate = new Ractive(config);

	});
});
page({
	hashbang: true
});
