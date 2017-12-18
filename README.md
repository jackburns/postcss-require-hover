# PostCSS Require Hover Support [![Build Status][ci-img]][ci]

[PostCSS] plugin that wraps hover selectors in a media media that's only valid on devices that support true hover events..

[postcss]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/raptiq/postcss-require-hover-support.svg
[ci]: https://travis-ci.org/raptiq/postcss-require-hover-support

```css
.foo {
    a{a:hover{display: block;}}
```

```css
.foo {
    a {
        @media not all and (hover: none) {
            a:hover {
                display: block;
            }
        }
    }
}
```

## Usage

```js
postcss([require("postcss-require-hover-support")]);
```

See [PostCSS] docs for examples for your environment.
