/* =============================================================

	Tabby v7.0
	Simple, mobile-first toggle tabs by Chris Ferdinandi
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.tabby = (function (window, document, undefined) {

	'use strict';

	// Default settings
	// Private method
	// Returns an {object}
	var _defaults = {
		toggleActiveClass: 'active',
		contentActiveClass: 'active',
		initClass: 'js-tabby',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};

	// Merge default settings with user options
	// Private method
	// Returns an {object}
	var _mergeObjects = function ( original, updates ) {
		for (var key in updates) {
			original[key] = updates[key];
		}
		return original;
	};

	// Get siblings of an element
	// Private method
	// Returns array of nodes
	var _getSiblings = function (elem) {
		var siblings = [];
		var sibling = elem.parentNode.firstChild;
		var skipMe = elem;
		for ( ; sibling; sibling = sibling.nextSibling ) {
			if ( sibling.nodeType == 1 && sibling != elem ) {
				siblings.push( sibling );
			}
		}
		return siblings;
	};

	// Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the tab
	// Private method
	// Runs functions
	var _stopVideo = function (tab) {
		var iframe = tab.querySelector( 'iframe');
		var video = tab.querySelector( 'video' );
		if ( iframe !== null ) {
			var iframeSrc = iframe.src;
			iframe.src = iframeSrc;
		}
		if ( video !== null ) {
			video.pause();
		}
	};

	// Remove '.active' class from all other tab toggles
	// Private method
	// Runs functions
	var _deactivateOtherToggles = function ( toggleSiblings, toggleParentSiblings, options ) {
		Array.prototype.forEach.call(toggleSiblings, function (sibling) {
			sibling.classList.remove( options.toggleActiveClass );
		});
		Array.prototype.forEach.call(toggleParentSiblings, function (sibling) {
			if ( sibling.tagName === 'LI' ) {
				sibling.classList.remove( options.toggleActiveClass );
			}
		});
	};

	// Hide all tab content sections
	// Private method
	// Runs functions
	var _hideOtherTabs = function ( tabSiblings, options ) {
		Array.prototype.forEach.call(tabSiblings, function (tab) {
			if ( tab.classList.contains( options.contentActiveClass ) ) {
				_stopVideo(tab);
				tab.classList.remove( options.contentActiveClass );
			}
		});
	};

	// Show target tabs
	// Private method
	// Runs functions
	var _showTargetTabs = function ( tabs, options ) {
		Array.prototype.forEach.call(tabs, function (tab) {
			var tabSiblings = _getSiblings(tab);
			tab.classList.add( options.contentActiveClass );
			_hideOtherTabs(tabSiblings, options);
		});
	};

	// Show a tab (and hide all others)
	// Public method
	// Runs functions
	var toggleTab = function ( toggle, tabID, options, event ) {

		// Selectors and variables
		options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
		var tabs = document.querySelectorAll(tabID); // Get tab content

		// Get other toggle elements
		var toggleParent = toggle.parentNode;
		var toggleSiblings = _getSiblings(toggle);
		var toggleParentSiblings = _getSiblings(toggleParent);

		// If a link, prevent default click event
		if ( toggle && toggle.tagName === 'A' && event ) {
			event.preventDefault();
		}

		options.callbackBefore( toggle, tabID ); // Run callbacks before toggling tab

		// Set clicked toggle to active. Deactivate others.
		toggle.classList.add( options.toggleActiveClass );
		if ( toggleParent && toggleParent.tagName === 'LI' ) {
			toggleParent.classList.add( options.toggleActiveClass );
		}
		_deactivateOtherToggles(toggleSiblings, toggleParentSiblings, options);

		// Show target tab content. Hide others.
		_showTargetTabs(tabs, options);

		options.callbackAfter( toggle, tabID ); // Run callbacks after toggling tab

	};

	// Initialize Tabby
	// Public method
	// Runs functions
	var init = function ( options ) {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			// Selectors and variables
			options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
			var toggles = document.querySelectorAll('[data-tab]'); // Get all tab toggle elements
			document.documentElement.classList.add( options.initClass ); // Add class to HTML element to activate conditional CSS

			// When tab toggles are clicked, hide/show tab content
			Array.prototype.forEach.call(toggles, function (toggle) {
				toggle.addEventListener('click', toggleTab.bind(null, toggle, toggle.getAttribute('data-tab'), options), false);
			});

		}

	};

	// Return public methods
	return {
		init: init,
		toggleTab: toggleTab
	};

})(window, document);