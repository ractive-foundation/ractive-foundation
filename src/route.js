/*global page, superagent*/
Ractive.DEBUG = false;

page.base('/testRunner.html');
page('/component/:name/use-case/:useCase', function (ctx) {
	var params = ctx.params;
	var url = ['/use-cases/', params.name, '/', params.useCase, '.json'];

	superagent.get(url.join(''), function (err, res) {

		var result = res.body.data || {};

		var Component = RactiveF.components[params.name];

		window.component = new Component({
				el: '#component',
				onrender: function () {
					this.set( _.extend(result, { isDataModel: true }) );
				}
		});

	});
});
page({
	hashbang: true
});
