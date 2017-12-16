var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
    return postcss([plugin(opts)])
        .process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('does a thing', () => {
    return run(
        'a{a:hover{display: block;}}',
        'a{@media not all and (hover: none) {a:hover{display: block;}}}',
        {}
    );
});

it('does another thing', () => {
    return run(
        'a{a:hover, a:focus{display: block;}}',
        'a{@media not all and (hover: none) {a:hover{display: block;}}a:focus{display: block;}}',
        {}
    );
});
