# PostCSS Require Hover

[postcss]: https://github.com/postcss/postcss

[PostCSS] plugin that wraps hover selectors in a media media that's only valid on devices that support true hover events. The goal of this plugin is to prevent mobile browsers (mostly iOS) from getting their hover states "stuck" since hover.

Original idea: https://www.quirksmode.org/blog/archives/2012/11/what_the_hells.html

More explicit support for this feature: https://drafts.csswg.org/mediaqueries/#hover

Tested:

-   IE11
-   Chrome
-   Safari
-   Firefox
-   iOS - Safari/Chrome
-   Android - Chrome

## Example

```css
.foo {
    bar:hover {
        display: block;
    }
}
```

```css
.foo {
    @media (hover: hover), (-moz-touch-enabled: 0), (-ms-high-contrast: none), (-ms-high-contrast: active) {
        bar:hover {
            display: block;
        }
    }
}
```

## Installation

```
npm install postcss-require-hover
```

## Usage

```js
postcss([require("postcss-require-hover")]);
```

See [PostCSS] docs for examples for your environment.
