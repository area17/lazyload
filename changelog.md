# A17 Lazy Load Change Log

All notable changes to this project will be documented in this file.

## 0.1.0

* initial release

## 0.1.1

* Safari doesn't always auto play videos with `autoplay` after the `src` has been added - forcing it to play the video

## 0.1.2

* Safari doesn't always auto play videos with `autoplay` after the `src` has been added. Added an option to force auto play of these videos by replacing the node *this will cause any event listeners on the video to fail*

## 0.1.3

* First trying to load the video, then replacing if option set

## 0.1.4

* Moving repo and demo page to Github

## 0.1.5

* Adds namespace to config for custom attribute naming. Namespace is inserted after `data-` to the following attributes: `data-src`, `data-srcset`, `data-lazyload`, `data-lazyloaded`