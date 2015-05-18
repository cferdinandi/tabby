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
	* `gulp watch` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).



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

The code is available under the [MIT License](LICENSE.md).