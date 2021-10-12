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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLWRlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsZ0JBQWdCLEVBQUUsbUJBQW1CO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7QUNuREY7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDSG1GO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0dBQVM7QUFDcEM7QUFDQTs7Ozs7O1VDdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTm1CO0FBQ0M7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zLy4vbm9kZV9tb2R1bGVzL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1jb21tb24tdXRpbHMvc3JjL2NvbnZlcnRlci9YbWxUb0pzb24uanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWZldGNoLWV4dGVudGlvbnMvLi9zcmMvSFRNTC5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy8uL3NyYy9TVkcuanMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWZldGNoLWV4dGVudGlvbnMvLi9zcmMvWE1MLmpzIiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zLy4vc3JjL1htbEFzSnNvbi5qcyIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGRlZmF1bHQtanMvZGVmYXVsdGpzLWZldGNoLWV4dGVudGlvbnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZGVmYXVsdC1qcy9kZWZhdWx0anMtZmV0Y2gtZXh0ZW50aW9ucy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BkZWZhdWx0LWpzL2RlZmF1bHRqcy1mZXRjaC1leHRlbnRpb25zLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQVRUUklCVVRFX1BSRklYID0gXCJAXCI7XHJcbmNvbnN0IFRFWFRDT05URU5UID0gXCJAXCI7XHJcblxyXG5jb25zdCBwYXJzZSA9IChjb250ZW50KSA9PiB7XHJcblx0Y29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xyXG5cdHJldHVybiBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGNvbnRlbnQsIFwiYXBwbGljYXRpb24veG1sXCIpO1xyXG59O1xyXG5cclxuY29uc3QgeG1sVG9Kc29uID0gKG5vZGUpID0+IHtcclxuXHQvLyBDcmVhdGUgdGhlIHJldHVybiBvYmplY3RcclxuXHRpZiAobm9kZS5ub2RlVHlwZSA9PSAzIHx8IG5vZGUubm9kZVR5cGUgPT0gNCkgcmV0dXJuIG5vZGUudGV4dENvbnRlbnQudHJpbSgpO1xyXG5cclxuXHRjb25zdCBoYXNBdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzICYmIG5vZGUuYXR0cmlidXRlcy5sZW5ndGggPiAwO1xyXG5cdGNvbnN0IGhhc0NoaWxkTm9kZXMgPSBub2RlLmNoaWxkRWxlbWVudENvdW50ID4gMDtcclxuXHJcblx0aWYgKCFoYXNBdHRyaWJ1dGVzICYmICFoYXNDaGlsZE5vZGVzKSByZXR1cm4gbm9kZS50ZXh0Q29udGVudC50cmltKCk7XHJcblxyXG5cdC8vIHByb2Nlc3MgY2hpbGRzXHJcblx0Y29uc3Qgb2JqID0ge307XHJcblx0bGV0IHRleHRDb250ZW50ID0gXCJcIjtcclxuXHQvLyBlbGVtZW50IGRvIGF0dHJpYnV0ZXNcclxuXHRpZiAoaGFzQXR0cmlidXRlcykge1xyXG5cdFx0Zm9yIChsZXQgYXR0cmlidXRlIG9mIG5vZGUuYXR0cmlidXRlcykgb2JqW2Ake0FUVFJJQlVURV9QUkZJWH0ke2F0dHJpYnV0ZS5ub2RlTmFtZX1gXSA9IGF0dHJpYnV0ZS5ub2RlVmFsdWU7XHJcblx0fVxyXG5cclxuXHRmb3IgKGxldCBpdGVtIG9mIG5vZGUuY2hpbGROb2Rlcykge1xyXG5cdFx0aWYgKGl0ZW0ubm9kZVR5cGUgPT0gMSkge1xyXG5cdFx0XHRjb25zdCBub2RlTmFtZSA9IGl0ZW0ubm9kZU5hbWU7XHJcblx0XHRcdGlmICh0eXBlb2Ygb2JqW25vZGVOYW1lXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdG9ialtub2RlTmFtZV0gPSB4bWxUb0pzb24oaXRlbSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBvYmpbbm9kZU5hbWVdLnB1c2ggPT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdHZhciBvbGQgPSBvYmpbbm9kZU5hbWVdO1xyXG5cdFx0XHRcdFx0b2JqW25vZGVOYW1lXSA9IFtdO1xyXG5cdFx0XHRcdFx0b2JqW25vZGVOYW1lXS5wdXNoKG9sZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG9ialtub2RlTmFtZV0ucHVzaCh4bWxUb0pzb24oaXRlbSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGl0ZW0ubm9kZVR5cGUgPT0gMyB8fCBpdGVtLm5vZGVUeXBlID09IDQpIHRleHRDb250ZW50ID0gdGV4dENvbnRlbnQgKyBpdGVtLnRleHRDb250ZW50O1xyXG5cdH1cclxuXHJcblx0dGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudC50cmltKCk7XHJcblx0aWYgKHRleHRDb250ZW50Lmxlbmd0aCA+IDApIG9ialtURVhUQ09OVEVOVF0gPSB0ZXh0Q29udGVudDtcclxuXHJcblx0cmV0dXJuIG9iajtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChjb250ZW50KSA9PiB7XHJcblx0aWYgKHR5cGVvZiBjb250ZW50ID09PSBcInN0cmluZ1wiKSBjb250ZW50ID0gcGFyc2UoY29udGVudCk7XHJcblxyXG5cdHJldHVybiB4bWxUb0pzb24oY29udGVudCk7XHJcbn07XHJcbiIsImlmKCFSZXNwb25zZS5wcm90b3R5cGUuaHRtbClcclxuUmVzcG9uc2UucHJvdG90eXBlLmh0bWwgPSBhc3luYyBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoYXdhaXQgdGhpcy50ZXh0KCksIFwidGV4dC9odG1sXCIpO1xyXG59OyIsImlmKCFSZXNwb25zZS5wcm90b3R5cGUuaHRtbClcclxuUmVzcG9uc2UucHJvdG90eXBlLnN2ZyA9IGFzeW5jIGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhhd2FpdCB0aGlzLnRleHQoKSwgXCJpbWFnZS9zdmcreG1sXCIpO1xyXG59OyIsImlmKCFSZXNwb25zZS5wcm90b3R5cGUueG1sKVxyXG5SZXNwb25zZS5wcm90b3R5cGUueG1sID0gYXN5bmMgZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGF3YWl0IHRoaXMudGV4dCgpLCBcImFwcGxpY2F0aW9uL3htbFwiKTtcclxufTsiLCJpbXBvcnQgeG1sVG9Kc29uIGZyb20gXCJAZGVmYXVsdC1qcy9kZWZhdWx0anMtY29tbW9uLXV0aWxzL3NyYy9jb252ZXJ0ZXIvWG1sVG9Kc29uXCI7XHJcblxyXG5jb25zdCBDT05URU5UVFlQRSA9IFwiQ29udGVudC1UeXBlXCI7XHJcbmNvbnN0IENPTlRFTlRUWVBFX0xPV0VSQ0FTRSA9IENPTlRFTlRUWVBFLnRvTG93ZXJDYXNlKCk7XHJcbmNvbnN0IEFMTE9XRURfQ09OVEVOVFRZUEVfUkVHRVggPSAvLip4bWwuKi9pZ1xyXG5jb25zdCBBTExPV0VEX0ZJTEVfRVhURU5USU9OX1JFR0VYID0gLy4rXFwuKHhtbCkvaWdcclxuXHJcbmNvbnN0IG9yZ0pzb24gPSBSZXNwb25zZS5wcm90b3R5cGUuanNvbjtcclxuUmVzcG9uc2UucHJvdG90eXBlLmpzb24gPSBhc3luYyBmdW5jdGlvbigpe1xyXG5cclxuICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLmhlYWRlcnM7XHJcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0KENPTlRFTlRUWVBFKSB8fCBoZWFkZXJzLmdldChDT05URU5UVFlQRV9MT1dFUkNBU0UpO1xyXG5cclxuICAgIGxldCBjb252ZXJ0VG9Kc29uID0gZmFsc2U7XHJcbiAgICBpZihjb250ZW50VHlwZSlcclxuICAgICAgICBjb252ZXJ0VG9Kc29uID0gQUxMT1dFRF9DT05URU5UVFlQRV9SRUdFWC50ZXN0KGNvbnRlbnRUeXBlKVxyXG4gICAgZWxzZXtcclxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHRoaXMudXJsLCBsb2NhdGlvbik7XHJcbiAgICAgICAgY29udmVydFRvSnNvbiA9IEFMTE9XRURfRklMRV9FWFRFTlRJT05fUkVHRVgudGVzdCh1cmwucGF0aG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb252ZXJ0VG9Kc29uID8geG1sVG9Kc29uKGF3YWl0IHRoaXMueG1sKCkpIDogb3JnSnNvbi5jYWxsKHRoaXMpO1xyXG59O1xyXG4gICAgIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3JjL1hNTFwiO1xyXG5pbXBvcnQgXCIuL3NyYy9IVE1MXCI7XHJcbmltcG9ydCBcIi4vc3JjL1NWR1wiO1xyXG5pbXBvcnQgXCIuL3NyYy9YbWxBc0pzb25cIjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=