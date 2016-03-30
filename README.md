# Tabby [![Build Status](https://travis-ci.org/cferdinandi/tabby.svg)](https://travis-ci.org/cferdinandi/tabby)
Simple toggle tabs.

Supports deep linking to a specific tab via anchor links (ex. http://some-url.com#tabID). Browser back button can be used to navigate back through tabs.

[Download Tabby](https://github.com/cferdinandi/tabby/archive/master.zip) / [View the demo](http://cferdinandi.github.io/tabby/)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

### 1. Include Tabby on your site.

```html
<link rel="stylesheet" href="css/tabby.css">
<script src="js/tabby.js"></script>
```

### 2. Add the markup to your HTML.

For semantic reasons, tab toggles must be links, but can be strutured however you see fit. Make sure that the `href` for each tab toggle matches the id of the target `.tabs-pane`.

Add the `[data-tabs]` attribute to the tab toggles parent element, and the `[data-tab]` attribute to individual toggles. Add a `[data-tabs-content]` attribute to the tab content group parent element, and the `[data-tabs-pane]` attribute to individual tab content.

Add the `.active` class to the tab and content that you'd like displayed by default.

```html
<ul data-tabs class="tabs">
	<li><a data-tab href="#taba">Superheroes</a></li>
	<li><a data-tab href="#tabb">Ice Cream</a></li>
	<li><a data-tab href="#tabc">Seasons</a></li>
</ul>

<div data-tabs-content>
	<div data-tabs-pane class="tabs-pane active" id="taba">
		<p><strong>Superheros</strong></p>
		<p>Spiderman, Batman, or Iron Man... which one is your favorite?</p>
	</div>
	<div data-tabs-pane class="tabs-pane" id="tabb">
		<p><strong>Ice Cream</strong></p>
		<p>Chocolate, vanilla or strawberry?</p>
	</div>
	<div data-tabs-pane class="tabs-pane" id="tabc">
		<p><strong>Seasons</strong></p>
		<p>Winter, summer, spring or fall?</p>
	</div>
</div>
```

### 3. Initialize Tabby.

In the footer of your page, after the content, initialize Tabby. And that's it, you're done. Nice work!

```html
<script>
	tabby.init();
</script>
```



## Installing with Package Managers

You can install Tabby with your favorite package manager.

* **NPM:** `npm install cferdinandi/tabby`
* **Bower:** `bower install https://github.com/cferdinandi/tabby.git`
* **Component:** `component install cferdinandi/tabby`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code, and runs unit tests.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).
	* `gulp test` compiles files and runs unit tests.



## Options and Settings

Tabby includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Tabby through the `init()` function:

```javascript
tabby.init({
	selectorToggle: '[data-tab]', // Tab toggle selector
	selectorToggleGroup: '[data-tabs]', // Tab toggle group selector
	selectorContent: '[data-tabs-pane]', // Tab content selector
	selectorContentGroup: '[data-tabs-content]', // Tab content group selector
	toggleActiveClass: 'active', // Class added to active toggle elements
	contentActiveClass: 'active', // Class added to active tab content areas
	initClass: 'js-tabby', // Class added to <html> element when initiated
	callback: function () {} // Function that's run after tab content is toggled
});
```

***Note:*** *If you change the `selector`, you still need to include the `[data-tab]` attribute in order to pass in the selector for the tab content.*

### Use Tabby events in your own scripts

You can also call Tabby toggle event in your own scripts.

### toggleTab()
Show tab content.

```javascript
tabby.toggleTab(
	toggle, // Node that toggles the tab action. ex. document.querySelector('#toggle')
	tabID, // The ID of the tab content area to show. ex. '#content'
	options, // Classes and callbacks. Same options as those passed into the init() function.
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

Tabby works in all modern browsers, and IE 10 and above. You can extend browser support back to IE 9 with the [classList.js polyfill](https://github.com/eligrey/classList.js/).

Tabby is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, all content will be displayed by default.



## How to Contribute

Please review the [contributing guidelines](CONTRIBUTING.md).



## Credits

Kudos to [Remy Sharp](https://24ways.org/2015/how-tabs-should-work/) for inspiring the more accessible code base in version 10.



## License

The code is available under the [MIT License](LICENSE.md).