/* =============================================================

	Tabby v6.0
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
		callbackAfter: function () {},
		callbackShow: function () {},
		callbackHide: function () {}
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

	// Remove '.active' class from all other tab toggles
	// Private method
	// Runs functions
	var _deactivateOtherToggles = function ( toggleParentSiblings, toggleSiblings, options ) {
		Array.prototype.forEach.call(toggleParentSiblings, function (sibling, index) {
			buoy.removeClass(sibling, options.toggleActiveClass);
		});
		Array.prototype.forEach.call(toggleSiblings, function (sibling, index) {
			buoy.removeClass(sibling, options.toggleActiveClass);
		});
	};

	// Hide all tab content sections
	// Private method
	// Runs functions
	var _hideOtherTabs = function ( tabSiblings, options ) {
		Array.prototype.forEach.call(tabSiblings, function (tab, index) {
			//only change if the tab was active
			if (buoy.hasClass(tab,options.contentActiveClass)){
				buoy.removeClass(tab, options.contentActiveClass);
				//call after hiding tab
				options.callbackHide(tab);
			}
		});
	};

	// Show target tabs
	// Private method
	// Runs functions
	var _showTargetTabs = function ( tabs, options ) {
		Array.prototype.forEach.call(tabs, function (tab, index) {
			var tabSiblings = buoy.getSiblings(tab);
			buoy.addClass(tab, options.contentActiveClass);
			_hideOtherTabs(tabSiblings, options);
			//call after showing the new tab
			options.callbackShow(tab);
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
		var toggleSiblings = buoy.getSiblings(toggle);
		var toggleParentSiblings = buoy.getSiblings(toggleParent);

		// If a link, prevent default click event
		if ( toggle && toggle.tagName === 'A' && event ) {
			event.preventDefault();
		}

		options.callbackBefore(); // Run callbacks before toggling tab

		// Set clicked toggle to active. Deactivate others.
		buoy.addClass(toggle, options.toggleActiveClass);
		buoy.addClass(toggleParent, options.toggleActiveClass);
		_deactivateOtherToggles(toggleParentSiblings, toggleSiblings, options);

		// Show target tab content. Hide others.
		_showTargetTabs(tabs, options);

		options.callbackAfter(); // Run callbacks after toggling tab

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
			buoy.addClass(document.documentElement, options.initClass); // Add class to HTML element to activate conditional CSS

			// When tab toggles are clicked, hide/show tab content
			Array.prototype.forEach.call(toggles, function (toggle, index) {
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