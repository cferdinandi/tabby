/* =============================================================

	Buoy v2.0
	A simple classList polyfill by Chris Ferdinandi.
	http://gomakethings.com

	Forked from classList.js by Eli Grey.
	https://github.com/eligrey/classList.js

	Free to use under the MIT License.
	http://gomakethings.com/mit/

 * ============================================================= */

window.buoy = (function (window, document, undefined) {

	if ( 'document' in self && !( 'classList' in document.createElement('_') ) ) {

		(function (view) {

			'use strict';

			if ( !( 'Element' in view ) ) return;

			var classListProp = 'classList';
			var protoProp = 'prototype';
			var elemCtrProto = view.Element[protoProp];
			var objCtr = Object;
			var strTrim = String[protoProp].trim || function () {
				return this.replace(/^\s+|\s+$/g, '');
			};
			var arrIndexOf = Array[protoProp].indexOf || function (item) {
				var
					i = 0,
					len = this.length;
				for (; i < len; i++) {
					if (i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			};
			// Vendors: please allow content code to instantiate DOMExceptions
			var DOMEx = function (type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			};
			var checkTokenAndGetIndex = function (classList, token) {
				if ( token === '' ) {
					throw new DOMEx(
						'SYNTAX_ERR',
						'An invalid or illegal string was specified'
					);
				}
				if ( /\s/.test(token) ) {
					throw new DOMEx(
						'INVALID_CHARACTER_ERR',
						'String contains an invalid character'
					);
				}
				return arrIndexOf.call(classList, token);
			};
			var ClassList = function (elem) {
				var trimmedClasses = strTrim.call(elem.getAttribute('class') || '');
				var classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [];
				var i = 0;
				var len = classes.length;
				for (; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function () {
					elem.setAttribute('class', this.toString());
				};
			};
			var classListProto = ClassList[protoProp] = [];
			var classListGetter = function () {
				return new ClassList(this);
			};

			// Most DOMException implementations don't allow calling DOMException's toString()
			// on non-DOMExceptions. Error's toString() is sufficient here.
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function (i) {
				return this[i] || null;
			};
			classListProto.contains = function (token) {
				token += '';
				return checkTokenAndGetIndex(this, token) !== -1;
			};
			classListProto.add = function () {
				var tokens = arguments;
				var i = 0;
				var l = tokens.length;
				var token;
				var updated = false;
				do {
					token = tokens[i] + '';
					if (checkTokenAndGetIndex(this, token) === -1) {
						this.push(token);
						updated = true;
					}
				}
				while ( ++i < l );

				if ( updated ) {
					this._updateClassName();
				}
			};
			classListProto.remove = function () {
				var tokens = arguments;
				var i = 0;
				var l = tokens.length;
				var token;
				var updated = false;
				do {
					token = tokens[i] + '';
					var index = checkTokenAndGetIndex(this, token);
					if (index !== -1) {
						this.splice(index, 1);
						updated = true;
					}
				}
				while ( ++i < l );
				if ( updated ) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function (token, force) {
				token += '';
				var result = this.contains(token);
				var method = result ? force !== true && 'remove' : force !== false && 'add';
				if (method) {
					this[method](token);
				}
				return !result;
			};
			classListProto.toString = function () {
				return this.join(' ');
			};

			if ( objCtr.defineProperty ) {
				var classListPropDesc = {
					get: classListGetter,
					enumerable: true,
					configurable: true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) { // IE 8 doesn't support enumerable:true
					if (ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if ( objCtr[protoProp].__defineGetter__ ) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}

		}(self));

	}

})(window, document);