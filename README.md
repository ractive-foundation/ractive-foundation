# ractive-foundation
[![Build Status](https://travis-ci.org/ractive-foundation/ractive-foundation.svg?branch=master)](https://travis-ci.org/ractive-foundation/ractive-foundation)
[![Code Quality](https://www.codacy.com/project/badge/abe39910d64144fc9219964f3652dbda)](https://www.codacy.com/app/pv-shum/ractive-foundation)
[![bitHound Score](https://www.bithound.io/github/ractive-foundation/ractive-foundation/badges/score.svg)](https://www.bithound.io/github/ractive-foundation/ractive-foundation/master)
[![Dependencies Status](https://david-dm.org/tractive-foundatio/ractive-foundation.svg)](https://david-dm.org/ractive-foundation/ractive-foundation)
[![Join the chat at https://gitter.im/themacclesoft/ractive-foundation](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/themacclesoft/ractive-foundation?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Overview

Ractive.js components for Foundation v5 markup and styles.

Building [Ractive.js](http://www.ractivejs.org/) components based on [Foundation](http://foundation.zurb.com/docs/)
markup and styles.

Current repository is a __work in progress__. When it's finished, you'll be able to build websites using this instead
of Foundation v5 JavaScript.

End goal is to build up a library of reusable components for Foundation v5.

## Requirements

* nodejs
* `sudo npm install -g gulp`

## Getting Started

Install the package via npm, all dependencies will be in the `dist` folder.

```shell
$ npm install ractive-foundation --save
```

Or download and add the dependencies. (again all dependencies will be in the `dist` folder)

```html
<script src='ractive.js'></script>
<script src='hammer.min.js'></script>
<script src='lodash-compat.js'></script>
<script src='ractive-touch.js'></script>
<script src='ractive-events-tap.js'></script>
<script src='ractivef.js'></script>
```


Example use of components:
```html
<ux-row>
    <ux-col class="large-12 medium-12 small-12">
      <ux-panel>
        <ux-header level="1">Hello World</ux-header>
      </ux-panel>
    </ux-col>
</ux-row>
```

## Get Involved

Clone the repo, then from the root folder:

1. `npm start`
1. Open [http://localhost:9080/](http://localhost:9080/) in your browser

## Creating a new component

Use `gulp wing --name ux-blah` to create a new `ux-blah` folder (and files) in `src/components`.

```bash
$ gulp wing --name ux-blah
[07:22:07] Using gulpfile ~/dev/projects/ractive-foundation/Gulpfile.js
[07:22:07] Starting 'wing'...
[07:22:07] Finished 'wing' after 1.16 ms
```

Use ``` gulp wing --help``` for more info

## Everything in public folder is temporary!

**Important note:** Any file in public folder is copied there as part of the gulp build process.

See `src` folder for original files to edit.

## Static and Dynamic components

Dynamic components are a feature for integrating with your backend systems on page load, feeding dynamic data to a
component on the page.

That component needs to be built to work with dynamic data - see `ux-iconbar` for an example.

If you pass `datamodel` to a component, it will have that data assigned to it. It can be an escaped JSON string, or
passed down from a parent component. Example:

```html
<ux-iconbar datamodel="{&quot;class&quot;:&quot;label-right&quot;,&quot;items&quot;:[{&quot;href&quot;:&quot;/&quot;,&quot;src&quot;:&quot;images/fi-home.svg&quot;,&quot;label&quot;:&quot;Home&quot;},{&quot;href&quot;:&quot;/path/to/blah&quot;,&quot;src&quot;:&quot;images/fi-bookmark.svg&quot;,&quot;label&quot;:&quot;Bookmark&quot;},{&quot;src&quot;:&quot;images/fi-info.svg&quot;,&quot;label&quot;:&quot;Info&quot;,&quot;class&quot;:&quot;disabled&quot;},{&quot;src&quot;:&quot;images/fi-mail.svg&quot;,&quot;label&quot;:&quot;Mail&quot;},{&quot;src&quot;:&quot;images/fi-like.svg&quot;,&quot;label&quot;:&quot;Like&quot;}]}"></ux-iconbar>
```

is basically the same as:

```html
<ux-iconbar class="label-right">
    <ux-iconbaritem src="images/fi-home.svg">Home</ux-iconbaritem>
    <ux-iconbaritem src="images/fi-bookmark.svg">Bookmark</ux-iconbaritem>
    <ux-iconbaritem src="images/fi-info.svg" class="disabled">Info</ux-iconbaritem>
    <ux-iconbaritem src="images/fi-mail.svg">Mail</ux-iconbaritem>
    <ux-iconbaritem src="images/fi-like.svg">Like</ux-iconbaritem>
</ux-iconbar>
```

## Accessibility (a11y)

ractive-foundation uses [a11y](http://addyosmani.github.io/a11y/) with gulp for automated accessibility testing.

Example uses:

```
# Build and audit entire component list
gulp a11y

# Skip the build process, just audit
gulp a11y-only

# Single component with all its use cases
gulp a11y --component=ux-button
gulp a11y -c ux-button
gulp a11y-only --component=ux-button

# Run only a single use case
gulp a11y --component ux-button --usecase ClickMe
gulp a11y -c ux-button -u ClickMe
gulp a11y-only --component=ux-button --usecase=ClickMe
```

Example usage (failure):

```
$ gulp a11y-only -c ux-button -u BuyNow
[17:59:54] Using gulpfile ~/dev/projects/ractive-foundation/gulpfile.js
[17:59:54] Starting 'a11y-connect'...
[17:59:55] Finished 'a11y-connect' after 139 ms
[17:59:55] Starting 'a11y-only'...
[17:59:55] Server started http://localhost:8089
[17:59:56] a11y FAIL http://localhost:8089/testRunner.html#!/component/ux-button/use-case/BuyNow

*** Begin accessibility audit results ***
An accessibility audit found
Warnings:
Warning: AX_COLOR_01 (Text elements should have a reasonable contrast ratio) failed on the following element:
#childComponent > .button
See https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_color_01 for more information.

Warning: AX_FOCUS_03 (Avoid positive integer values for tabIndex) failed on the following element:
#childComponent > .button
See https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_03 for more information.


*** End accessibility audit results ***

[17:59:56] 'a11y-only' errored after 1.37 s One or more a11y tests failed, see log.
```


## Run on Device

### Prerequisities

You need the SDK installed for each platform you wish to target.

### Building the App

To create a Cordova app within your project:

`gulp cordova-build --android`

This will also install the Android platform if the Android SDK is installed on your machine.
The cordova project will be saved in the `/.cordova` directory.

### Run the App

To then run:

`gulp cordova-run --android`

