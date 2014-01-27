/* =============================================================

	Tabby v5.0
	Simple, mobile-first toggle tabs by Chris Ferdinandi
	http://gomakethings.com

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

;window.tabby = (function (window, document, undefined) {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		// SELECTORS

		// Get all tab toggle elements
		var tabToggle = document.querySelectorAll('[data-tab]');


		// METHODS

		// Setup function to show a tab (and hide all others)
		var showTab = function (toggle) {

			// SELECTORS

			// Define the target tab
			var dataID = toggle.getAttribute('data-target');
			var dataTarget = document.querySelectorAll(dataID);

			// Get other toggle elements
			var toggleParent = toggle.parentNode;
			var toggleSiblings = buoy.getSiblings(toggle);
			var toggleParentSiblings = buoy.getSiblings(toggleParent);


			// METHODS

			// Setup function to remove '.active' class from all other tab toggles
			var deactivateOtherToggles = function ( toggleParentSiblings, toggleSiblings ) {
				[].forEach.call(toggleParentSiblings, function (sibling) {
					buoy.removeClass(sibling, 'active');
				});
				[].forEach.call(toggleSiblings, function (sibling) {
					buoy.removeClass(sibling, 'active');
				});
			};

			// Setup function to hide all tab content sections
			var hideOtherTabs = function ( targetSiblings ) {
				[].forEach.call(targetSiblings, function (sibling) {
					buoy.removeClass(sibling, 'active');
				});
			};

			// Setup function to show target tabs
			var showTargetTabs = function ( dataTarget ) {
				[].forEach.call(dataTarget, function (target) {
					var targetSiblings = buoy.getSiblings(target);
					buoy.addClass(target, 'active');
					hideOtherTabs(targetSiblings);
				});
			};


			// EVENTS, LISTENERS, AND INITS

			// Set clicked toggle to active. Deactivate others.
			buoy.addClass(toggle, 'active');
			buoy.addClass(toggleParent, 'active');
			deactivateOtherToggles(toggleParentSiblings, toggleSiblings);

			// Show target tab content. Hide others.
			showTargetTabs(dataTarget);

		};


		// EVENTS, LISTENERS, AND INITS

		// When tab toggles are clicked, hide/show tab content
		[].forEach.call(tabToggle, function (toggle) {
			toggle.addEventListener('click', function(e) {
				e.preventDefault();
				showTab(toggle);
			}, false);
		});

	}

})(window, document);