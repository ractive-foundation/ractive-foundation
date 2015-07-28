(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['ractive', 'lodash-compat'], factory);
    } else if (typeof exports === 'object') {
        factory(require('ractive'), require('lodash-compat'));
    } else {
        factory(root.Ractive, root._);
    }
}(this, function (Ractive, _) {
/* jshint ignore:start */
<%= contents %>
/* jshint ignore:end */
}));
