# A17 Lazy Load

* Demos [https://area17.github.io/lazyload/](https://area17.github.io/lazyload/)
* Issues [https://github.com/area17/lazyload/issues](https://github.com/area17/lazyload/issues)

## Introduction

A straight forward lazy loader using `IntersectionObserver` if available and if not, it uses a `requestAnimationFrame` loop if available. If neither are available **it does nothing**.

When a watched element is in the view port it swaps `data-src/data-srcset` on `img`, `source` and `iframe` to `src/srcset`. It also adds a load listener and removes the `data-` attribute on load to allow you to hook styles up to the two different states.

If `data-srcset` to `srcset` and `typeof picturefill`, attempts to run `picturefill()` on the element.

When it runs out of elements to watch, the loop ends.

More detailed instructions on usage are at: [https://area17.github.io/lazyload/](https://area17.github.io/lazyload/)

## Usage

```html
<script src="path/to/a17-lazyload.min.js"></script>
<script>
  lazyload();
</script>
```

Also available via NPM:

```sh
npm install @area17/a17-lazyload
```

```js
import lazyload from '@area17/a17-lazyload';

lazyload();
```

## Issues/Contributing/Discussion

If you find a bug in a17-lazyload, please add it to [the issue tracker](https://github.com/area17/lazyload/issues) or fork it, fix it and submit a pull request for it (👍).

The development script is `dist/a17-lazyload.js`. Tabs are 2 spaces, functions are commented, variables are camel case and its preferred that its easier to read than outright file size being the smallest possible.

Make sure to include a minified version inside of `dist` by running: `npm run minify` (you'll need to `npm run install` to install `terser`). The minified version is added to the git repository for users who aren't using build tools.

## Support

IE10+ because of the use of `requestAnimationFrame` if no `IntersectionObserver`.

## Coming soon

* Work in check for `loading="lazy"` support: [https://addyosmani.com/blog/lazy-loading/](https://addyosmani.com/blog/lazy-loading/)
* Use a `MutationObserver` to check for dynamically added elements to check.

## Filesize

* ~8kb uncompressed
* ~3kb minified
* ~1kb minified and gzipped
