var postcss = require('postcss');

var plugin = require('./');

function stripFormatting(string) {
    return string.replace(/\s/g, '');
}

function run(input, output, opts) {
    return postcss([plugin(opts)])
        .process(input)
        .then(result => {
            expect(stripFormatting(result.css)).toEqual(
                stripFormatting(output)
            );
            expect(result.warnings().length).toBe(0);
        });
}

it('basic wrapper', () => {
    return run(
        'a{a:hover{display: block;}}',
        `a{
            @media not all and (hover: none), (-ms-high-contrast: none) {
                a:hover{display: block;}
            }
        }`,
        {}
    );
});

it('one hover, one nonhover selector', () => {
    return run(
        'a{a:hover, a:focus{display: block;}}',
        `a{
            @media not all and (hover: none), (-ms-high-contrast: none) {
                a:hover{display: block;}
            }
            a:focus{display: block;}
        }`,
        {}
    );
});

it('multiple hover selectors and nonhover selectors', () => {
    return run(
        `
        .wrapper .modal .text-input--focused .text-input__label,
        .wrapper .modal .text-input:hover .text-input__label,
        .text-input--focused .text-input__label,
        .text-input:hover .text-input__label {
        	color: #4a4a4a;
        }
        `,
        `@media not all and (hover: none), (-ms-high-contrast: none) {
            .wrapper .modal .text-input:hover .text-input__label,
            .text-input:hover .text-input__label {
                color: #4a4a4a;
            }
        }
        .wrapper .modal .text-input--focused .text-input__label,
        .text-input--focused .text-input__label {
            color: #4a4a4a;
        }`,
        {}
    );
});

it('more multiple hover selectors and nonhover selectors', () => {
    return run(
        `.text-input--focused .text-input__label,
	    .text-input:hover .text-input__label,
	    .wrapper .modal .text-input--focused .text-input__label,
	    .wrapper .modal .text-input:hover .text-input__label {
	      color: #4a4a4a;
	    }`,
        `@media not all and (hover: none), (-ms-high-contrast: none) {
            .text-input:hover .text-input__label, 
            .wrapper .modal .text-input:hover .text-input__label {
	            color: #4a4a4a;
            }
        }
        .text-input--focused .text-input__label, 
        .wrapper .modal .text-input--focused .text-input__label {
	      color: #4a4a4a;
	    }`,
        {}
    );
});
