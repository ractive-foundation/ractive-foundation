var _ = require('lodash-compat');

module.exports = {

	flattenClassList: function (classList) {
		if (_.isArray(classList)) {
			return _(classList)
				.map(function (string) {
					return string.split(' ');
				})
				.flatten()
				.filter()
				.value();
		}
		return classList.split(' ');
	}

};