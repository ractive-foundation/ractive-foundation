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

		if (data.template) {
			config.template = data.template;
			window.currentComponent = new Ractive(config);
		}
		else {
			window.currentComponent = new Ractive.components[params.name](config);
		}

	});
});
page({
	hashbang: true
});
