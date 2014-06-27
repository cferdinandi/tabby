describe('Tabby', function () {

	//
	// Helper Functions
	//

	/**
	 * Inserts Houdini markup into DOM
	 */
	var injectElem = function () {
		var elem =
			'<div class="tabset">' +
				'<div class="tabs">' +
					'<button data-tab="#tab1">Superheroes</button>' +
					'<button data-tab="#tab2">Ice Cream</button>' +
					'<button data-tab="#tab3">Seasons</button>' +
				'</div>' +
				'<div class="tabs-content">' +
					'<div class="tabs-pane" id="tab1">' +
						'Superheros' +
					'</div>' +
					'<div class="tabs-pane" id="tab2">' +
						'Ice Cream' +
					'</div>' +
					'<div class="tabs-pane" id="tab3">' +
						'Seasons' +
					'</div>' +
				'</div>' +
			'</div>' +

			'<div class="tabset">' +
				'<ul class="tabs">' +
					'<li><a data-tab="#tabA" href="#">Superheroes</a></li>' +
					'<li><a data-tab="#tabB" href="#">Ice Cream</a></li>' +
					'<li><a data-tab="#tabC" href="#">Seasons</a></li>' +
				'</ul>' +
				'<div class="tabs-content">' +
					'<div class="tabs-pane" id="tabA">' +
						'Superheros' +
					'</div>' +
					'<div class="tabs-pane" id="tabB">' +
						'Ice Cream' +
					'</div>' +
					'<div class="tabs-pane" id="tabC">' +
						'Seasons' +
					'</div>' +
				'</div>' +
			'</div>';
		document.body.innerHTML = elem;
	};

	/**
	 * Triggers an event
	 * @param  {String} type Type of event (ex. 'click')
	 * @param  {Element} elem The element that triggered the event
	 * @link http://stackoverflow.com/a/2490876
	 */
	var trigger = function (type, elem) {
		var event; // The custom event that will be created

		if (document.createEvent) {
			event = document.createEvent('HTMLEvents');
			event.initEvent(type, true, true);
		} else {
			event = document.createEventObject();
			event.eventType = type;
		}

		event.eventName = type;

		if (document.createEvent) {
			elem.dispatchEvent(event);
		} else {
			elem.fireEvent("on" + event.eventType, event);
		}
	};

	/**
	 * Bind polyfill for PhantomJS
	 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility
	 */
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (oThis) {
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5
				// internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1);
			var fToBind = this;
			var fNOP = function () {};
			var fBound = function () {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
			};

			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();

			return fBound;
		};
	}


	//
	// Init
	//

	describe('Should initialize plugin', function () {

		beforeEach(function () {
			tabby.init();
		});

		it('Document should include the tabby module', function () {
			expect(!!tabby).toBe(true);
		});

		it('Document should contain init class', function () {
			expect(document.documentElement.classList.contains('js-tabby')).toBe(true);
		});

	});

	describe('Should merge user options into defaults', function () {

		var toggle, content, doc;

		beforeEach(function () {
			injectElem();
			tabby.init({
				toggleActiveClass: 'toggle-active',
				contentActiveClass: 'content-active',
				initClass: 'js-test',
				callbackBefore: function () { document.documentElement.classList.add('callback-before'); },
				callbackAfter: function () { document.documentElement.classList.add('callback-after'); }
			});
			toggle = document.querySelector('[data-tab]');
			content = document.querySelector( toggle.getAttribute('data-tab') );
			doc = document.documentElement;
		});

		it('User options should be merged into defaults', function () {
			trigger('click', toggle);
			expect(toggle.classList.contains('toggle-active')).toBe(true);
			expect(content.classList.contains('content-active')).toBe(true);
			expect(doc.classList.contains('js-test')).toBe(true);
			expect(doc.classList.contains('callback-before')).toBe(true);
			expect(doc.classList.contains('callback-after')).toBe(true);
			trigger('click', toggle);
			tabby.destroy();
		});

	});


	//
	// Events
	//

	describe('Should toggle tab content on click', function () {

		var tabsets, toggle1, toggle2, content1, content2;

		beforeEach(function () {
			injectElem();
			tabby.init();
			tabsets = document.querySelectorAll('.tabset');
			toggles1 = tabsets[0].querySelectorAll('[data-tab]');
			content1 = tabsets[0].querySelectorAll('.tabs-pane');
			toggles2 = tabsets[1].querySelectorAll('[data-tab]');
			content2 = tabsets[1].querySelectorAll('.tabs-pane');
		});

		it('Toggle button and content should have ".active" class on click', function () {
			trigger('click', toggles1[0]);
			expect(toggles1[0].classList.contains('active')).toBe(true);
			expect(content1[0].classList.contains('active')).toBe(true);
		});

		it('Toggle list item, link, and content should have ".active" class on click', function () {
			trigger('click', toggles2[0]);
			expect(toggles2[0].classList.contains('active')).toBe(true);
			expect(toggles2[0].parentNode.classList.contains('active')).toBe(true);
			expect(content2[0].classList.contains('active')).toBe(true);
		});

	});

	describe('Should hide other tab content on click', function () {

		var tabsets, toggle1, toggle2, content1, content2;

		beforeEach(function () {
			injectElem();
			tabby.init();
			tabsets = document.querySelectorAll('.tabset');
			toggles1 = tabsets[0].querySelectorAll('[data-tab]');
			content1 = tabsets[0].querySelectorAll('.tabs-pane');
			toggles2 = tabsets[1].querySelectorAll('[data-tab]');
			content2 = tabsets[1].querySelectorAll('.tabs-pane');
		});

		it('Other toggle buttons and content should not have ".active" class on click', function () {
			trigger('click', toggles1[0]);
			expect(toggles1[0].classList.contains('active')).toBe(true);
			expect(content1[0].classList.contains('active')).toBe(true);
			trigger('click', toggles1[1]);
			expect(toggles1[0].classList.contains('active')).toBe(false);
			expect(content1[0].classList.contains('active')).toBe(false);
			expect(toggles1[2].classList.contains('active')).toBe(false);
			expect(content1[2].classList.contains('active')).toBe(false);
		});

		it('Other toggle list items, links, and content should not have ".active" class on click', function () {
			trigger('click', toggles2[0]);
			expect(toggles2[0].classList.contains('active')).toBe(true);
			expect(toggles2[0].parentNode.classList.contains('active')).toBe(true);
			expect(content2[0].classList.contains('active')).toBe(true);
			trigger('click', toggles2[1]);
			expect(toggles2[0].classList.contains('active')).toBe(false);
			expect(toggles2[0].parentNode.classList.contains('active')).toBe(false);
			expect(content2[0].classList.contains('active')).toBe(false);
		});

	});

});
