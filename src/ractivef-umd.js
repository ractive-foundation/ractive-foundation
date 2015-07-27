(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['Ractive', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        factory(require('Ractive'), require('underscore'));
    } else {
        factory(root.Ractive, root._);
    }
}(this, function (Ractive, _) {
/* jshint ignore:start */
<%= contents %>
/* jshint ignore:end */
}));
