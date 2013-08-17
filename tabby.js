/* =============================================================

    Tabby v3.0
    Simple, mobile-first toggle tabs by Chris Ferdinandi
    http://gomakethings.com

    Free to use under the MIT License.
    http://gomakethings.com/mit/
    
 * ============================================================= */


/* =============================================================
    MICRO-FRAMEWORK
    Simple vanilla JavaScript functions to handle common tasks.
 * ============================================================= */

// Check if an element has a class
var hasClass = function (elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

// Add a class to an element
var addClass = function (elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

// Remove a class from an element
var removeClass = function (elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// Toggle a class on an element
var toggleClass = function (elem, className) {
    if ( hasClass(elem, className) ) {
        removeClass(elem, className);
    }
    else {
        addClass(elem, className);
    }
}

// Return sibling elements
var getSiblings = function (elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;
    var skipMe = elem;
    for ( ; sibling; sibling = sibling.nextSibling ) 
       if ( sibling.nodeType == 1 && sibling != elem )
          siblings.push( sibling );        
    return siblings;
}


/* =============================================================
    TABBY FUNCTIONS
    Control the toggle tabs.
 * ============================================================= */

// Feature Test
if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

    // Function to show a tab
    var showTab = function (toggle) {

        // Define the target tab and siblings
        var dataID = toggle.getAttribute('data-target');
        var dataTarget = document.querySelector(dataID);
        var targetSiblings = getSiblings(dataTarget);

        // Get toggle parent and parent sibling elements
        var toggleParent = toggle.parentNode;
        var toggleSiblings = getSiblings(toggleParent);

        // Add '.active' class to tab toggle and parent element
        addClass(toggle, 'active');
        addClass(toggleParent, 'active');

        // Remove '.active' class from all sibling elements
        [].forEach.call(toggleSiblings, function (sibling) {
            removeClass(sibling, 'active');
        });

        // Add '.active' class to target tab
        addClass(dataTarget, 'active');

        // Remove '.active' class from all other tabs
        [].forEach.call(targetSiblings, function (sibling) {
            removeClass(sibling, 'active');
        });

    }

    // Define tab toggles
    var tabToggle = document.querySelectorAll('.tabs a, .tabs button');

    // For each tab toggle
    [].forEach.call(tabToggle, function (toggle) {

        // When tab toggle is clicked
        toggle.addEventListener('click', function(e) {
         
            // Prevent default link behavior
            e.preventDefault();

            // Activate the tab
            showTab(toggle);
         
        }, false);

    });

}
