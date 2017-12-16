var postcss = require('postcss');

module.exports = postcss.plugin('postcss-require-hover-support', function () {
    return function (root) {
        root.walkRules(function (rule) {
            if (rule.selector.indexOf(':hover') !== -1) {
                var hoverClone = rule.clone();
                var hoverSelectors = [];

                var selectors = rule.selectors.filter(function (selector) {
                    if (selector.indexOf(':hover') !== -1) {
                        hoverSelectors.push(selector);
                        return false;
                    }
                    return true;
                });

                if (selectors.length > 0) {
                    hoverClone.selectors = hoverSelectors;
                    rule.selectors = selectors;
                    rule.parent.prepend(
                        '@media not all and (hover: none) {' + hoverClone + '}'
                    );
                } else {
                    var normalClone = rule.clone();
                    rule.replaceWith(
                        '@media not all and (hover: none) {' + normalClone + '}'
                    );
                }
            }
        });
    };
});
