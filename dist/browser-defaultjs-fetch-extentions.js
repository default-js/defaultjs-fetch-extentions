/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@default-js/defaultjs-common-utils/src/converter/XmlToJson.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@default-js/defaultjs-common-utils/src/converter/XmlToJson.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ATTRIBUTE_PRFIX = "@";
const TEXTCONTENT = "@";

const parse = (content) => {
	const parser = new DOMParser();
	return parser.parseFromString(content, "application/xml");
};

const xmlToJson = (node) => {
	// Create the return object
	if (node.nodeType == 3 || node.nodeType == 4) return node.textContent.trim();

	const hasAttributes = node.attributes && node.attributes.length > 0;
	const hasChildNodes = node.childElementCount > 0;

	if (!hasAttributes && !hasChildNodes) return node.textContent.trim();

	// process childs
	const obj = {};
	let textContent = "";
	// element do attributes
	if (hasAttributes) {
		for (let attribute of node.attributes) obj[`${ATTRIBUTE_PRFIX}${attribute.nodeName}`] = attribute.nodeValue;
	}

	for (let item of node.childNodes) {
		if (item.nodeType == 1) {
			const nodeName = item.nodeName;
			if (typeof obj[nodeName] === "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof obj[nodeName].push === "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		} else if (item.nodeType == 3 || item.nodeType == 4) textContent = textContent + item.textContent;
	}

	textContent = textContent.trim();
	if (textContent.length > 0) obj[TEXTCONTENT] = textContent;

	return obj;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((content) => {
	if (typeof content === "string") content = parse(content);

	return xmlToJson(content);
});


/***/ }),

/***/ "./src/HTML.js":
/*!*********************!*\
  !*** ./src/HTML.js ***!
  \*********************/
/***/ (() => {

if(!Response.prototype.html)
Response.prototype.html = async function(){
    return new DOMParser().parseFromString(await this.text(), "text/html");
};

/***/ }),

/***/ "./src/SVG.js":
/*!********************!*\
  !*** ./src/SVG.js ***!
  \********************/
/***/ (() => {

if(!Response.prototype.html)
Response.prototype.svg = async function(){
    return new DOMParser().parseFromString(await this.text(), "image/svg+xml");
};

/***/ }),

/***/ "./src/XML.js":
/*!********************!*\
  !*** ./src/XML.js ***!
  \********************/
/***/ (() => {

if(!Response.prototype.xml)
Response.prototype.xml = async function(){
    return new DOMParser().parseFromString(await this.text(), "application/xml");
};

/***/ }),

/***/ "./src/XmlAsJson.js":
/*!**************************!*\
  !*** ./src/XmlAsJson.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_js_defaultjs_common_utils_src_converter_XmlToJson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @default-js/defaultjs-common-utils/src/converter/XmlToJson */ "./node_modules/@default-js/defaultjs-common-utils/src/converter/XmlToJson.js");


const CONTENTTYPE = "Content-Type";
const CONTENTTYPE_LOWERCASE = CONTENTTYPE.toLowerCase();
const ALLOWED_CONTENTTYPE_REGEX = /.*xml.*/ig
const ALLOWED_FILE_EXTENTION_REGEX = /.+\.(xml)/ig

const orgJson = Response.prototype.json;
Response.prototype.json = async function(){

    const headers = this.headers;
    const contentType = headers.get(CONTENTTYPE) || headers.get(CONTENTTYPE_LOWERCASE);

    let convertToJson = false;
    if(contentType)
        convertToJson = ALLOWED_CONTENTTYPE_REGEX.test(contentType)
    else{
        const url = new URL(this.url, location);
        convertToJson = ALLOWED_FILE_EXTENTION_REGEX.test(url.pathname);
    }

    return convertToJson ? (0,_default_js_defaultjs_common_utils_src_converter_XmlToJson__WEBPACK_IMPORTED_MODULE_0__["default"])(await this.xml()) : orgJson.call(this);
};
    

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_XML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/XML */ "./src/XML.js");
/* harmony import */ var _src_XML__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_XML__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_HTML__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/HTML */ "./src/HTML.js");
/* harmony import */ var _src_HTML__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_HTML__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_SVG__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/SVG */ "./src/SVG.js");
/* harmony import */ var _src_SVG__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_src_SVG__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_XmlAsJson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/XmlAsJson */ "./src/XmlAsJson.js");




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELGdCQUFnQixFQUFFLG1CQUFtQjtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7O0FDbkRGO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0htRjs7QUFFbkY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixzR0FBUztBQUNwQztBQUNBOzs7Ozs7VUN2QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNObUI7QUFDQztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWZldGNoLWV4dGVudGlvbnMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvY29udmVydGVyL1htbFRvSnNvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy8uL3NyYy9IVE1MLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zLy4vc3JjL1NWRy5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy8uL3NyYy9YTUwuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWZldGNoLWV4dGVudGlvbnMvLi9zcmMvWG1sQXNKc29uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWZldGNoLWV4dGVudGlvbnMvLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBVFRSSUJVVEVfUFJGSVggPSBcIkBcIjtcclxuY29uc3QgVEVYVENPTlRFTlQgPSBcIkBcIjtcclxuXHJcbmNvbnN0IHBhcnNlID0gKGNvbnRlbnQpID0+IHtcclxuXHRjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XHJcblx0cmV0dXJuIHBhcnNlci5wYXJzZUZyb21TdHJpbmcoY29udGVudCwgXCJhcHBsaWNhdGlvbi94bWxcIik7XHJcbn07XHJcblxyXG5jb25zdCB4bWxUb0pzb24gPSAobm9kZSkgPT4ge1xyXG5cdC8vIENyZWF0ZSB0aGUgcmV0dXJuIG9iamVjdFxyXG5cdGlmIChub2RlLm5vZGVUeXBlID09IDMgfHwgbm9kZS5ub2RlVHlwZSA9PSA0KSByZXR1cm4gbm9kZS50ZXh0Q29udGVudC50cmltKCk7XHJcblxyXG5cdGNvbnN0IGhhc0F0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXMgJiYgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCA+IDA7XHJcblx0Y29uc3QgaGFzQ2hpbGROb2RlcyA9IG5vZGUuY2hpbGRFbGVtZW50Q291bnQgPiAwO1xyXG5cclxuXHRpZiAoIWhhc0F0dHJpYnV0ZXMgJiYgIWhhc0NoaWxkTm9kZXMpIHJldHVybiBub2RlLnRleHRDb250ZW50LnRyaW0oKTtcclxuXHJcblx0Ly8gcHJvY2VzcyBjaGlsZHNcclxuXHRjb25zdCBvYmogPSB7fTtcclxuXHRsZXQgdGV4dENvbnRlbnQgPSBcIlwiO1xyXG5cdC8vIGVsZW1lbnQgZG8gYXR0cmlidXRlc1xyXG5cdGlmIChoYXNBdHRyaWJ1dGVzKSB7XHJcblx0XHRmb3IgKGxldCBhdHRyaWJ1dGUgb2Ygbm9kZS5hdHRyaWJ1dGVzKSBvYmpbYCR7QVRUUklCVVRFX1BSRklYfSR7YXR0cmlidXRlLm5vZGVOYW1lfWBdID0gYXR0cmlidXRlLm5vZGVWYWx1ZTtcclxuXHR9XHJcblxyXG5cdGZvciAobGV0IGl0ZW0gb2Ygbm9kZS5jaGlsZE5vZGVzKSB7XHJcblx0XHRpZiAoaXRlbS5ub2RlVHlwZSA9PSAxKSB7XHJcblx0XHRcdGNvbnN0IG5vZGVOYW1lID0gaXRlbS5ub2RlTmFtZTtcclxuXHRcdFx0aWYgKHR5cGVvZiBvYmpbbm9kZU5hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0b2JqW25vZGVOYW1lXSA9IHhtbFRvSnNvbihpdGVtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIG9ialtub2RlTmFtZV0ucHVzaCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0dmFyIG9sZCA9IG9ialtub2RlTmFtZV07XHJcblx0XHRcdFx0XHRvYmpbbm9kZU5hbWVdID0gW107XHJcblx0XHRcdFx0XHRvYmpbbm9kZU5hbWVdLnB1c2gob2xkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0b2JqW25vZGVOYW1lXS5wdXNoKHhtbFRvSnNvbihpdGVtKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoaXRlbS5ub2RlVHlwZSA9PSAzIHx8IGl0ZW0ubm9kZVR5cGUgPT0gNCkgdGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudCArIGl0ZW0udGV4dENvbnRlbnQ7XHJcblx0fVxyXG5cclxuXHR0ZXh0Q29udGVudCA9IHRleHRDb250ZW50LnRyaW0oKTtcclxuXHRpZiAodGV4dENvbnRlbnQubGVuZ3RoID4gMCkgb2JqW1RFWFRDT05URU5UXSA9IHRleHRDb250ZW50O1xyXG5cclxuXHRyZXR1cm4gb2JqO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGNvbnRlbnQpID0+IHtcclxuXHRpZiAodHlwZW9mIGNvbnRlbnQgPT09IFwic3RyaW5nXCIpIGNvbnRlbnQgPSBwYXJzZShjb250ZW50KTtcclxuXHJcblx0cmV0dXJuIHhtbFRvSnNvbihjb250ZW50KTtcclxufTtcclxuIiwiaWYoIVJlc3BvbnNlLnByb3RvdHlwZS5odG1sKVxuUmVzcG9uc2UucHJvdG90eXBlLmh0bWwgPSBhc3luYyBmdW5jdGlvbigpe1xuICAgIHJldHVybiBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGF3YWl0IHRoaXMudGV4dCgpLCBcInRleHQvaHRtbFwiKTtcbn07IiwiaWYoIVJlc3BvbnNlLnByb3RvdHlwZS5odG1sKVxuUmVzcG9uc2UucHJvdG90eXBlLnN2ZyA9IGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoYXdhaXQgdGhpcy50ZXh0KCksIFwiaW1hZ2Uvc3ZnK3htbFwiKTtcbn07IiwiaWYoIVJlc3BvbnNlLnByb3RvdHlwZS54bWwpXHJcblJlc3BvbnNlLnByb3RvdHlwZS54bWwgPSBhc3luYyBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoYXdhaXQgdGhpcy50ZXh0KCksIFwiYXBwbGljYXRpb24veG1sXCIpO1xyXG59OyIsImltcG9ydCB4bWxUb0pzb24gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2NvbnZlcnRlci9YbWxUb0pzb25cIjtcblxuY29uc3QgQ09OVEVOVFRZUEUgPSBcIkNvbnRlbnQtVHlwZVwiO1xuY29uc3QgQ09OVEVOVFRZUEVfTE9XRVJDQVNFID0gQ09OVEVOVFRZUEUudG9Mb3dlckNhc2UoKTtcbmNvbnN0IEFMTE9XRURfQ09OVEVOVFRZUEVfUkVHRVggPSAvLip4bWwuKi9pZ1xuY29uc3QgQUxMT1dFRF9GSUxFX0VYVEVOVElPTl9SRUdFWCA9IC8uK1xcLih4bWwpL2lnXG5cbmNvbnN0IG9yZ0pzb24gPSBSZXNwb25zZS5wcm90b3R5cGUuanNvbjtcblJlc3BvbnNlLnByb3RvdHlwZS5qc29uID0gYXN5bmMgZnVuY3Rpb24oKXtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmhlYWRlcnM7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldChDT05URU5UVFlQRSkgfHwgaGVhZGVycy5nZXQoQ09OVEVOVFRZUEVfTE9XRVJDQVNFKTtcblxuICAgIGxldCBjb252ZXJ0VG9Kc29uID0gZmFsc2U7XG4gICAgaWYoY29udGVudFR5cGUpXG4gICAgICAgIGNvbnZlcnRUb0pzb24gPSBBTExPV0VEX0NPTlRFTlRUWVBFX1JFR0VYLnRlc3QoY29udGVudFR5cGUpXG4gICAgZWxzZXtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh0aGlzLnVybCwgbG9jYXRpb24pO1xuICAgICAgICBjb252ZXJ0VG9Kc29uID0gQUxMT1dFRF9GSUxFX0VYVEVOVElPTl9SRUdFWC50ZXN0KHVybC5wYXRobmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnZlcnRUb0pzb24gPyB4bWxUb0pzb24oYXdhaXQgdGhpcy54bWwoKSkgOiBvcmdKc29uLmNhbGwodGhpcyk7XG59O1xuICAgICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3NyYy9YTUxcIjtcbmltcG9ydCBcIi4vc3JjL0hUTUxcIjtcbmltcG9ydCBcIi4vc3JjL1NWR1wiO1xuaW1wb3J0IFwiLi9zcmMvWG1sQXNKc29uXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9