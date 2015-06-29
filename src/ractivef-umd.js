(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['Ractive', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('Ractive'), require('underscore'));
    } else {
        root.returnExports = factory(root.Ractive, root._);
    }
}(this, function (Ractive, _) {
/* jshint ignore:start */
<%= contents %>
/* jshint ignore:end */
}));
