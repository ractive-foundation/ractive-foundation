page.base('/test.html')
page('/component/:name', function (ctx) {
	var params = ctx.params;

	// TODO Load components dependant on hash.
	console.info('Should be loading ' + params.name + ' component!');

	console.debug(ctx);
});
page({
	hashbang: true
});
