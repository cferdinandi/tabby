/* =============================================================

	Tabby v5.2
	Simple, mobile-first toggle tabs by Chris Ferdinandi
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.tabby = (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// SELECTORS

		// Get all tab toggle elements
		var toggles = document.querySelectorAll('[data-tab]');


		// METHODS

		// Remove '.active' class from all other tab toggles
		var deactivateOtherToggles = function ( toggleParentSiblings, toggleSiblings ) {
			Array.prototype.forEach.call(toggleParentSiblings, function (sibling, index) {
				buoy.removeClass(sibling, 'active');
			});
			Array.prototype.forEach.call(toggleSiblings, function (sibling, index) {
				buoy.removeClass(sibling, 'active');
			});
		};

		// Hide all tab content sections
		var hideOtherTabs = function ( targetSiblings ) {
			Array.prototype.forEach.call(targetSiblings, function (sibling, index) {
				buoy.removeClass(sibling, 'active');
			});
		};

		// Show target tabs
		var showTargetTabs = function ( dataTarget ) {
			Array.prototype.forEach.call(dataTarget, function (target, index) {
				var targetSiblings = buoy.getSiblings(target);
				buoy.addClass(target, 'active');
				hideOtherTabs(targetSiblings);
			});
		};

		// Show a tab (and hide all others)
		var toggleTab = function (event) {

			// SELECTORS

			// Define the target tab
			var dataID = this.getAttribute('data-target');
			var dataTarget = document.querySelectorAll(dataID);

			// Get other toggle elements
			var toggleParent = this.parentNode;
			var toggleSiblings = buoy.getSiblings(this);
			var toggleParentSiblings = buoy.getSiblings(toggleParent);


			// EVENTS, LISTENERS, AND INITS

			event.preventDefault();

			// Set clicked toggle to active. Deactivate others.
			buoy.addClass(this, 'active');
			buoy.addClass(toggleParent, 'active');
			deactivateOtherToggles(toggleParentSiblings, toggleSiblings);

			// Show target tab content. Hide others.
			showTargetTabs(dataTarget);

		};


		// EVENTS, LISTENERS, AND INITS

		// Add class to HTML element to activate conditional CSS
		buoy.addClass(document.documentElement, 'js-tabby');

		// When tab toggles are clicked, hide/show tab content
		Array.prototype.forEach.call(toggles, function (toggle, index) {
			toggle.addEventListener('click', toggleTab, false);
		});

	}

})(window, document);