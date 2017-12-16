var postcss = require('postcss');

module.exports = postcss.plugin('postcss-require-hover-support', function () {
    return function (root) {
        root.walkRules(function (rule) {
            if (rule.selector.indexOf(':hover') !== -1) {
                var clone = rule.clone();
                rule.replaceWith(
                    '@media not all and (hover: none) {' + clone + '}'
                );
            }
        });
    };
});
