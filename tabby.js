/* =============================================================
 * tabby.js
 * Simple, mobile-first toggle tabs.
 * Script by Chris Ferdinandi - http://gomakethings.com
 * Licensed under WTFPL - http://www.wtfpl.net
 * ============================================================= */

(function($) {
    $(function () {
        $('.tabs a').click(function(e) {
            e.preventDefault(); // Prevent default link behavior.
            var tabID = $(this).attr('href'); // Pull the href value as the tabID.

            $(this).addClass('active').parent().addClass('active'); // Add the .active class to the link and it's parent li (if one exists).
            $(this).siblings().removeClass('active'); // Remove the .active class from sibling tab navigation elements.
            $(this).parent('li').siblings().removeClass('active').children().removeClass('active'); // Remove the .active class from sibling li elements and their links.
            $(tabID).addClass('active'); // Add the .active class to the div with the tab content.
            $(tabID).siblings().removeClass('active'); // Remove the .active class from other tab content divs.
        });
    });
})(jQuery);





/* =============================================================
 * js-accessibility.js
 * Adds .js class to <body> for progressive enhancement.
 * Script by Chris Ferdinandi - http://gomakethings.com
 * Licensed under WTFPL - http://www.wtfpl.net
 * ============================================================= */

(function($) {
    $(function () {
        $('body').addClass('js'); // On page load, add the .js class to the <body> element.
    });
})(jQuery);
