/* =============================================================

    Buoy v1.1
    A simple vanilla JS micro-library by Chris Ferdinandi.
    http://gomakethings.com

    Class handlers by Todd Motto.
    http://toddmotto.com/

    Module pattern by Keith Rousseau.
    https://twitter.com/keithtri

    Free to use under the MIT License.
    http://gomakethings.com/mit/

 * ============================================================= */

window.buoy = (function(){

    'use strict';

    // Check if an element has a class
    var hasClass = function (elem, className) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    };

    // Add a class to an element
    var addClass = function (elem, className) {
        if ( !hasClass(elem, className) ) {
            elem.className += ' ' + className;
        }
    };

    // Remove a class from an element
    var removeClass = function (elem, className) {
        var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
        if (hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    };

    // Toggle a class on an element
    var toggleClass = function (elem, className) {
        if ( hasClass(elem, className ) ) {
            removeClass(elem, className);
        }
        else {
            addClass(elem, className);
        }
    };

    // Get siblings of an element
    var getSiblings = function (elem) {
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

    // Return functions
    return {
        toggleClass: toggleClass,
        removeClass: removeClass,
        addClass: addClass,
        hasClass: hasClass,
        getSiblings: getSiblings
    };

})();