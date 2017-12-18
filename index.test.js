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

it('wut', () => {
    return run(
        `.wrapper .modal .text-input--focused .text-input__label,.wrapper .modal .text-input:hover .text-input__label,.text-input--focused .text-input__label,.text-input:hover .text-input__label {
        	color: #4a4a4a;
    	}`,
        `@media not all and (hover: none) {.wrapper .modal .text-input:hover .text-input__label,.text-input:hover .text-input__label {
    	color: #4a4a4a;
    	}}.wrapper .modal .text-input--focused .text-input__label,.text-input--focused .text-input__label {
        	color: #4a4a4a;
    	}`,
        {}
    );
});

it('really works', () => {
    return run(
        `.text-input--focused .text-input__label,
	    .text-input:hover .text-input__label,
	    .wrapper .modal .text-input--focused .text-input__label,
	    .wrapper .modal .text-input:hover .text-input__label {
	      color: #4a4a4a;
	    }`,
        `@media not all and (hover: none) {.text-input:hover .text-input__label,
	    .wrapper .modal .text-input:hover .text-input__label {
	      color: #4a4a4a;
	    }}.text-input--focused .text-input__label,
	    .wrapper .modal .text-input--focused .text-input__label {
	      color: #4a4a4a;
	    }`,
        {}
    );
});
