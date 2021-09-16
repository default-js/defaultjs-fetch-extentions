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

/***/ "./src/Xml.js":
/*!********************!*\
  !*** ./src/Xml.js ***!
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
const XMLREGEX = /.+\/.*(xml|html)/ig

const orgJson = Response.prototype.json;
Response.prototype.json = async function(){
    const contentType = this.headers[CONTENTTYPE];

    if(contentType && XMLREGEX.test(contentType)){
        return (0,_default_js_defaultjs_common_utils_src_converter_XmlToJson__WEBPACK_IMPORTED_MODULE_0__["default"])(await this.text());
    }

    return orgJson.call(this);
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
/* harmony import */ var _src_Xml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/Xml */ "./src/Xml.js");
/* harmony import */ var _src_Xml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_Xml__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_XmlAsJson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/XmlAsJson */ "./src/XmlAsJson.js");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLWRlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsZ0JBQWdCLEVBQUUsbUJBQW1CO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7QUNuREY7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNIbUY7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzR0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTm1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWZldGNoLWV4dGVudGlvbnMvLi9ub2RlX21vZHVsZXMvQGRlZmF1bHQtanMvZGVmYXVsdGpzLWNvbW1vbi11dGlscy9zcmMvY29udmVydGVyL1htbFRvSnNvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy8uL3NyYy9YbWwuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWZldGNoLWV4dGVudGlvbnMvLi9zcmMvWG1sQXNKc29uLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWZldGNoLWV4dGVudGlvbnMvLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBVFRSSUJVVEVfUFJGSVggPSBcIkBcIjtcclxuY29uc3QgVEVYVENPTlRFTlQgPSBcIkBcIjtcclxuXHJcbmNvbnN0IHBhcnNlID0gKGNvbnRlbnQpID0+IHtcclxuXHRjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XHJcblx0cmV0dXJuIHBhcnNlci5wYXJzZUZyb21TdHJpbmcoY29udGVudCwgXCJhcHBsaWNhdGlvbi94bWxcIik7XHJcbn07XHJcblxyXG5jb25zdCB4bWxUb0pzb24gPSAobm9kZSkgPT4ge1xyXG5cdC8vIENyZWF0ZSB0aGUgcmV0dXJuIG9iamVjdFxyXG5cdGlmIChub2RlLm5vZGVUeXBlID09IDMgfHwgbm9kZS5ub2RlVHlwZSA9PSA0KSByZXR1cm4gbm9kZS50ZXh0Q29udGVudC50cmltKCk7XHJcblxyXG5cdGNvbnN0IGhhc0F0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXMgJiYgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCA+IDA7XHJcblx0Y29uc3QgaGFzQ2hpbGROb2RlcyA9IG5vZGUuY2hpbGRFbGVtZW50Q291bnQgPiAwO1xyXG5cclxuXHRpZiAoIWhhc0F0dHJpYnV0ZXMgJiYgIWhhc0NoaWxkTm9kZXMpIHJldHVybiBub2RlLnRleHRDb250ZW50LnRyaW0oKTtcclxuXHJcblx0Ly8gcHJvY2VzcyBjaGlsZHNcclxuXHRjb25zdCBvYmogPSB7fTtcclxuXHRsZXQgdGV4dENvbnRlbnQgPSBcIlwiO1xyXG5cdC8vIGVsZW1lbnQgZG8gYXR0cmlidXRlc1xyXG5cdGlmIChoYXNBdHRyaWJ1dGVzKSB7XHJcblx0XHRmb3IgKGxldCBhdHRyaWJ1dGUgb2Ygbm9kZS5hdHRyaWJ1dGVzKSBvYmpbYCR7QVRUUklCVVRFX1BSRklYfSR7YXR0cmlidXRlLm5vZGVOYW1lfWBdID0gYXR0cmlidXRlLm5vZGVWYWx1ZTtcclxuXHR9XHJcblxyXG5cdGZvciAobGV0IGl0ZW0gb2Ygbm9kZS5jaGlsZE5vZGVzKSB7XHJcblx0XHRpZiAoaXRlbS5ub2RlVHlwZSA9PSAxKSB7XHJcblx0XHRcdGNvbnN0IG5vZGVOYW1lID0gaXRlbS5ub2RlTmFtZTtcclxuXHRcdFx0aWYgKHR5cGVvZiBvYmpbbm9kZU5hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0b2JqW25vZGVOYW1lXSA9IHhtbFRvSnNvbihpdGVtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIG9ialtub2RlTmFtZV0ucHVzaCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0dmFyIG9sZCA9IG9ialtub2RlTmFtZV07XHJcblx0XHRcdFx0XHRvYmpbbm9kZU5hbWVdID0gW107XHJcblx0XHRcdFx0XHRvYmpbbm9kZU5hbWVdLnB1c2gob2xkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0b2JqW25vZGVOYW1lXS5wdXNoKHhtbFRvSnNvbihpdGVtKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoaXRlbS5ub2RlVHlwZSA9PSAzIHx8IGl0ZW0ubm9kZVR5cGUgPT0gNCkgdGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudCArIGl0ZW0udGV4dENvbnRlbnQ7XHJcblx0fVxyXG5cclxuXHR0ZXh0Q29udGVudCA9IHRleHRDb250ZW50LnRyaW0oKTtcclxuXHRpZiAodGV4dENvbnRlbnQubGVuZ3RoID4gMCkgb2JqW1RFWFRDT05URU5UXSA9IHRleHRDb250ZW50O1xyXG5cclxuXHRyZXR1cm4gb2JqO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGNvbnRlbnQpID0+IHtcclxuXHRpZiAodHlwZW9mIGNvbnRlbnQgPT09IFwic3RyaW5nXCIpIGNvbnRlbnQgPSBwYXJzZShjb250ZW50KTtcclxuXHJcblx0cmV0dXJuIHhtbFRvSnNvbihjb250ZW50KTtcclxufTtcclxuIiwiaWYoIVJlc3BvbnNlLnByb3RvdHlwZS54bWwpXHJcblJlc3BvbnNlLnByb3RvdHlwZS54bWwgPSBhc3luYyBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoYXdhaXQgdGhpcy50ZXh0KCksIFwiYXBwbGljYXRpb24veG1sXCIpO1xyXG59OyIsImltcG9ydCB4bWxUb0pzb24gZnJvbSBcIkBkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2NvbnZlcnRlci9YbWxUb0pzb25cIjtcclxuXHJcbmNvbnN0IENPTlRFTlRUWVBFID0gXCJDb250ZW50LVR5cGVcIjtcclxuY29uc3QgWE1MUkVHRVggPSAvLitcXC8uKih4bWx8aHRtbCkvaWdcclxuXHJcbmNvbnN0IG9yZ0pzb24gPSBSZXNwb25zZS5wcm90b3R5cGUuanNvbjtcclxuUmVzcG9uc2UucHJvdG90eXBlLmpzb24gPSBhc3luYyBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgY29udGVudFR5cGUgPSB0aGlzLmhlYWRlcnNbQ09OVEVOVFRZUEVdO1xyXG5cclxuICAgIGlmKGNvbnRlbnRUeXBlICYmIFhNTFJFR0VYLnRlc3QoY29udGVudFR5cGUpKXtcclxuICAgICAgICByZXR1cm4geG1sVG9Kc29uKGF3YWl0IHRoaXMudGV4dCgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3JnSnNvbi5jYWxsKHRoaXMpO1xyXG59O1xyXG4gICAgIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3JjL1htbFwiO1xuaW1wb3J0IFwiLi9zcmMvWG1sQXNKc29uXCI7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9