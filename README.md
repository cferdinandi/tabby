# Tabby
Simple toggle tabs. [View the demo](http://cferdinandi.github.io/tabby/).

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Options & Settings](#options-and-settings)
3. [Browser Compatibility](#browser-compatibility)
4. [How to Contribute](#how-to-contribute)
5. [License](#license)
6. [Changelog](#changelog)
7. [Older Docs](#older-docs)



## Getting Started

### 1. Include Tabby on your site.

```html
<link rel="stylesheet" href="css/tabby-css.css">
<script src="js/tabby.js"></script>
<script src="buoy.js"></script>
```

Tabby is [built with Sass](http://sass-lang.com/) for easy customization. If you don't use Sass, that's ok. The `css` folder contains compiled vanilla CSS.

The `_config.scss` and `_mixins.scss` files are the same ones used in [Kraken](http://cferdinandi.github.io/kraken/), so you can drop the `_tabby.css` file right into Kraken without making any updates. Or, adjust the variables to suit your own project.

Tabby also requires [Buoy](http://cferdinandi.github.io/buoy/), a vanilla JS micro-library that contains simple helper functions used by Tabby.

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
	<li class="active"><a data-tab="#tab1" href="#">Superheroes</a></li>
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

You can also call Tabby toggle event in your own scripts:

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



## Browser Compatibility

Tabby works in all modern browsers, and IE 9 and above.

Tabby is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all content will be displayed by default. If you need to support older browsers, you can still [download the jQuery version of Tabby on GitHub](https://github.com/cferdinandi/tabby/tree/archive-v2).



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Don't forget to update the version number, the changelog (in the `readme.md` file), and when applicable, the documentation.



## License
Tabby is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog
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

* [Version 5](http://cferdinandi.github.io/tabby/archive/v5/)
* [Version 3](http://cferdinandi.github.io/tabby/archive/v3/)
* [Version 2](https://github.com/cferdinandi/tabby/tree/archive-v2)