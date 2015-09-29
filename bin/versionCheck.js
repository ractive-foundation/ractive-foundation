const MINIMUM_VERSION = '0.12.0';

var compareVersions = function (installed, required) {
	installed = installed.replace(/^v/, '');
	var a = installed.split('.');
	var b = required.split('.');

	for (var i = 0; i < a.length; ++i) {
		a[i] = Number(a[i]);
	}
	for (var i = 0; i < b.length; ++i) {
		b[i] = Number(b[i]);
	}
	if (a.length == 2) {
		a[2] = 0;
	}

	if (a[0] > b[0]) return true;
	if (a[0] < b[0]) return false;

	if (a[1] > b[1]) return true;
	if (a[1] < b[1]) return false;

	if (a[2] > b[2]) return true;
	if (a[2] < b[2]) return false;

	return true;
}

if (!compareVersions(process.version, MINIMUM_VERSION)) {
	var errorMessage = 'Invalid node version. Version %s or greater is required. '.replace('%s', MINIMUM_VERSION);
	errorMessage += 'Current version: %s'.replace('%s', process.version);
	console.log(errorMessage);
	process.exit(1);
}
