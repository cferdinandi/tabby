/* =============================================================

	Tabby v6.0
	Simple, mobile-first toggle tabs by Chris Ferdinandi
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.tabby = (function (window, document, undefined) {

	'use strict';

	// Stop YouTube, Vimeo, and HTML5 videos from playing when leaving the tab
	// Private method
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
	var _deactivateOtherToggles = function ( toggleParentSiblings, toggleSiblings ) {
		Array.prototype.forEach.call(toggleParentSiblings, function (sibling, index) {
			buoy.removeClass(sibling, 'active');
		});
		Array.prototype.forEach.call(toggleSiblings, function (sibling, index) {
			buoy.removeClass(sibling, 'active');
		});
	};

	// Hide all tab content sections
	// Private method
	var _hideOtherTabs = function ( targetSiblings ) {
		Array.prototype.forEach.call(targetSiblings, function (sibling, index) {
			buoy.removeClass(sibling, 'active');
			_stopVideo(sibling);
		});
	};

	// Show target tabs
	// Private method
	var _showTargetTabs = function ( dataTarget ) {
		Array.prototype.forEach.call(dataTarget, function (target, index) {
			var targetSiblings = buoy.getSiblings(target);
			buoy.addClass(target, 'active');
			_hideOtherTabs(targetSiblings);
		});
	};

	// Show a tab (and hide all others)
	// Private method
	var _toggleTab = function (event) {

		// Define the target tab
		var dataID = this.getAttribute('data-target');
		var dataTarget = document.querySelectorAll(dataID);

		// Get other toggle elements
		var toggleParent = this.parentNode;
		var toggleSiblings = buoy.getSiblings(this);
		var toggleParentSiblings = buoy.getSiblings(toggleParent);

		// Prevent default link behavior
		event.preventDefault();

		// Set clicked toggle to active. Deactivate others.
		buoy.addClass(this, 'active');
		buoy.addClass(toggleParent, 'active');
		_deactivateOtherToggles(toggleParentSiblings, toggleSiblings);

		// Show target tab content. Hide others.
		_showTargetTabs(dataTarget);

	};

	// Initialize Tabby
	var init = function () {

		// Feature test before initializing
		if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

			var toggles = document.querySelectorAll('[data-tab]'); // Get all tab toggle elements
			buoy.addClass(document.documentElement, 'js-tabby'); // Add class to HTML element to activate conditional CSS

			// When tab toggles are clicked, hide/show tab content
			Array.prototype.forEach.call(toggles, function (toggle, index) {
				toggle.addEventListener('click', _toggleTab, false);
			});

		}

	};

	// Return public methods
	return {
		init: init
	};

})(window, document);