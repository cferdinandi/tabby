# Tabby [![Build Status](https://travis-ci.org/cferdinandi/tabby.svg)](https://travis-ci.org/cferdinandi/tabby)
Simple toggle tabs.

[Download Tabby](https://github.com/cferdinandi/tabby/archive/master.zip) / [View the demo](http://cferdinandi.github.io/tabby/).

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Installing with Package Managers](#installing-with-package-managers)
3. [Working with the Source Files](#working-with-the-source-files)
4. [Options & Settings](#options-and-settings)
5. [Browser Compatibility](#browser-compatibility)
6. [How to Contribute](#how-to-contribute)
7. [License](#license)
8. [Changelog](#changelog)
9. [Older Docs](#older-docs)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

### 1. Include Tabby on your site.

```html
<link rel="stylesheet" href="css/tabby.css">
<script src="js/classList.js"></script>
<script src="js/tabby.js"></script>
```

Tabby is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

Tabby follows the same coding conventions as [Kraken](http://cferdinandi.github.io/kraken/), so you can drop the `_tabby.css` file right into Kraken without making any updates. Or, adjust the variables to suit your own project.

Tabby also requires [classList.js](https://github.com/eligrey/classList.js), a polyfill that extends ECMAScript 5 API support to more browsers.

### 2. Add the markup to your HTML.

Tab toggles can be buttons or links, and can optionally be wrapped in a list element. Make sure that the `[data-tab]` value of each tab toggle matches the ID of the matching `.tab-pane`.

Add the `.active` class to the tab and content that you'd like displayed by default.

**Standalone Buttons**

```html
<div class="tabs">
	<button class="active" data-tab="#tab1">Superheroes</button>
	<button data-tab="#tab2">Ice Cream</button>
	<button data-tab="#tab3">Seasons</button>
</div>

<div class="tabs-content">
	<div class="tabs-pane active" id="tab1">
		Superheros
		...
	</div>

	<div class="tabs-pane" id="tab2">
		Ice Cream
		...
	</div>

	<div class="tabs-pane" id="tab3">
		Seasons
		...
	</div>
</div>
```

**List Links**

```html
<ul class="tabs">
	<li class="active"><a class="active" data-tab="#tab1" href="#">Superheroes</a></li>
	<li><a data-tab="#tab2" href="#">Ice Cream</a></li>
	<li><a data-tab="#tab3" href="#">Seasons</a></li>
</ul>

<div class="tabs-content">
	<div class="tabs-pane active" id="tab1">
		Superheros
		...
	</div>
	...
</div>
```

### 3. Initialize Tabby.

```html
<script>
	tabby.init();
</script>
```

In the footer of your page, after the content, initialize Tabby. And that's it, you're done. Nice work!



## Installing with Package Managers

You can install Tabby with your favorite package manager.

* **NPM:** `npm install cferdinandi/tabby`
* **Bower:** `bower install https://github.com/cferdinandi/tabby.git`
* **Component:** `component install cferdinandi/tabby`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code, and runs unit tests. It's the same build system that's used by [Kraken](http://cferdinandi.github.io/kraken/), so it includes some unnecessary tasks and Sass variables but can be dropped right in to the boilerplate without any configuration.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Ruby Sass](http://sass-lang.com/install)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files when changes are made.
	* `gulp reload` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).



## Styling Tabby

Tabby ships without any default styles, so you can adapt it to whatever project you're working on. For responsive navigation patterns, you might use Tabby with [Astro](http://cferdinandi.github.io/astro/).

If you need something with styling, check out [Tabby 3](http://cferdinandi.github.io/tabby/archive/v3/).



## Options and Settings

Tabby includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Tabby through the `init()` function:

```javascript
tabby.init({
	toggleActiveClass: 'active', // Class added to active toggle elements
	contentActiveClass: 'active', // Class added to active tab content areas
	initClass: 'js-tabby', // Class added to <html> element when initiated
	callbackBefore: function ( toggle, tabID ) {}, // Function that's run before tab content is toggled
	callbackAfter: function ( toggle, tabID ) {} // Function that's run after tab content is toggled
});
```

### Use Tabby events in your own scripts

You can also call Tabby toggle event in your own scripts.

### toggleTab()
Show tab content.

```javascript
tabby.toggleTab(
	toggle, // Node that toggles the tab action. ex. document.querySelector('#toggle')
	tabID, // The ID of the tab content area to show. ex. '#content'
	options, // Classes and callbacks. Same options as those passed into the init() function.
	event // Optional, if a DOM event was triggered.
);
```

**Example**

```javascript
var toggle = document.querySelector('[data-tab="#tab2"]');
tabby.toggleTab( toggle, '#tab2' );
```

#### destroy()
Destroy the current `tabby.init()`. This is called automatically during the init function to remove any existing initializations.

```javascript
tabby.destroy();
```



## Browser Compatibility

Tabby works in all modern browsers, and IE 9 and above.

Tabby is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all content will be displayed by default. If you need to support older browsers, you can still [download the jQuery version of Tabby on GitHub](https://github.com/cferdinandi/tabby/tree/archive-v2).



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Don't forget to update the version number, the changelog (in the `readme.md` file), and when applicable, the documentation.



## License
Tabby is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

Tabby uses [semantic versioning](http://semver.org/).

* v7.4.3 - October 27, 2014
	* Removed `.bind` dependency and polyfill.
	* Updated `gulpfile.js` tasks and namespacing.
* v7.4.2 - October 2, 2014
	* Fixed CommonJS bug.
	* Added lazypipe to `gulpfile.js`.
* v7.4.1 - August 31, 2014
	* Fixed event listener filter to account for sub elements.
* v7.4.0 - August 23, 2014
	* Converted to Ruby Sass.
	* Updated unit test path.
	* Switched to event bubbling.
* v7.3.2 - August 15, 2014
	* Added fix for UMD structure.
* v7.3.1 - August 8, 2014
	* Added polyfill for `Functions.prototype.bind`.
	* Removed Sass paths from `gulpfile.js`.
* v7.3.0 - June 27, 2014
	* Updated unit tests.
	* Added `destroy()` method.
	* Fixed a bug that wasn't removing the `.active` class from `li` links.
* v7.2.0 - June 20, 2014
	* Converted to gulp.js workflow.
	* Added unit testing.
	* Updated naming conventions.
	* Removed unused `_config.scss` and `_mixins.scss` files.
	* Added minified versions of files.
* v7.1.1 - June 19, 2014
	* Fixed factory/root/UMD definition.
* v7.1.1 - June 8, 2014
	* Added UMD support.
	* Moved public APIs to exports variable.
	* Improved feature test.
	* Replaced `Array.prototype.forEach` hack with proper `forEach` function.
	* Added a more well supported `trim` function.
	* General code optimizations for better minification and performance.
	* Updated to JSDoc documentation.
	* Updated to three number versioning system.
	* Added package manager installation info.
* v7.0 - April 4, 2014
	* Converted from Buoy class helpers to `classList` with polyfill.
* v6.2 - March 18, 2014
	* Pass `toggle` and `tabID` variables into callbacks.
	* Run a check for `active` class before running `_stopVideos` function to avoid unneccessary reloading of `src`.
	* Checks if toggle is part of a list before crawling up DOM tree to avoid unneccessary class setting.
* v6.1 - February 27, 2014
	* Converted `_defaults` to a literal object
* v6.0 - February 24, 2014
	* Better public/private method namespacing.
	* Require `init()` call to run.
	* New API exposes additional methods for use in your own scripts.
	* Better documentation.
* v5.3 - February 16, 2014
	* [Added method to stop YouTube, Vimeo, and HTML5 videos from playing when tab is closed.](https://github.com/cferdinandi/tabby/issues/8)
* v5.2 - February 5, 2014
	* Reverted to `Array.prototype.forEach` loops.
* v5.1 - January 27, 2014
	* Updated addEventListener to be more object oriented.
	* Moved feature test to script itself.
* v5.0 - January 27, 2014
	* Switched to a data attribute for the toggle selector (separates scripts from styles).
	* Removed unused `tab-toggle` class.
	* Prefixed script with a `;` to prevent errors if other scripts are incorrectly closed.
	* Added namespacing to IIFE.
* v4.0 - December 4, 2013
	* Added Sass support.
	* Removed horizontal and vertical styling for great design flexibility.
	* Add active class to button elements.
* v3.2 - August 27, 2013
	* Added missing semicolon.
	* Activated strict mode.
* v3.1 - August 26,2013
	* Converted to an IIFE pattern.
	* Added Buoy vanilla JS micro-library.
* v3.0 - August 13, 2013
	* Converted to vanilla JS.
	* Removed dependence on jQuery.
* v2.1 - August 5, 2013
	* Updated with variable for `$(this)` (better performance).
* v2.0 - June 7, 2013
	* Switched to MIT license.
* v2.0 - June 5, 2013
	* Switched from `href` to `data-target` value for tab id, breaking backward compatibility.
* v1.1 - February 13, 2013
	* Renamed `example.html` to `index.html`.
* v1.1 - February 5, 2013
	* Switched to relative sizing.
* v1.0 - January 22, 2013
	* Initial release.



## Older Docs

* [Version 6](https://github.com/cferdinandi/tabby/tree/archive-v6)
* [Version 5](http://cferdinandi.github.io/tabby/archive/v5/)
* [Version 3](http://cferdinandi.github.io/tabby/archive/v3/)
* [Version 2](https://github.com/cferdinandi/tabby/tree/archive-v2)