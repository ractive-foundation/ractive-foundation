# ractive-foundation

[![Join the chat at https://gitter.im/themacclesoft/ractive-foundation](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/themacclesoft/ractive-foundation?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Overview

Ractive.js components for Foundation v5 markup and styles.

Experimenting with building [Ractive.js](http://www.ractivejs.org/) components based on [Foundation](http://foundation.zurb.com/docs/)  markup and styles.

Current repository is a __work in progress__.

End goal is to build up a library of reusable components for Foundation v5.

## Requirements

* nodejs
* `sudo npm install -g gulp`

## Getting started

Clone the repo, then from the root folder:

1. `npm install`
1. `gulp`
1. Open [http://localhost:9080/](http://localhost:9080/) in your browser

## Creating a new component

Use `gulp wing --name ux-blah` to create a new `ux-blah` folder (and files) in `src/components`.

```
$ gulp wing --name ux-blah
[07:22:07] Using gulpfile ~/dev/projects/ractive-foundation/Gulpfile.js
[07:22:07] Starting 'wing'...
[07:22:07] Finished 'wing' after 1.16 ms
```

Use ``` gulp wing --help``` for more info
