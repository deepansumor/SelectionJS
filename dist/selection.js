/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var SelectionJS;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cursor.ts":
/*!***********************!*\
  !*** ./src/cursor.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   moveCursorToEnd: () => (/* binding */ moveCursorToEnd),\n/* harmony export */   moveCursorToStart: () => (/* binding */ moveCursorToStart)\n/* harmony export */ });\n/**\r\n * @fileoverview Utility functions to move the cursor (selection) to specific positions.\r\n * These functions are useful when modifying selected text dynamically.\r\n *\r\n * @author Deepansu Mor\r\n * @github deepansumor\r\n * @email deepansumor@gmail.com\r\n */\r\n/**\r\n * Moves the cursor (selection) to the end of the inserted node.\r\n * This ensures that the user continues typing after the newly inserted content.\r\n *\r\n * @param {Node} node - The DOM node where the cursor should be placed at the end.\r\n */\r\nfunction moveCursorToEnd(node) {\r\n    const selection = window.getSelection();\r\n    if (!selection)\r\n        return;\r\n    // Clear any existing selections to avoid conflicts\r\n    selection.removeAllRanges();\r\n    // Create a new range and collapse it to the end of the node\r\n    const range = document.createRange();\r\n    range.selectNodeContents(node);\r\n    range.collapse(false); // Move to the end\r\n    // Apply the new selection\r\n    selection.addRange(range);\r\n}\r\n/**\r\n * Moves the cursor (selection) to the start of the inserted node.\r\n * This ensures that the user starts typing before the newly inserted content.\r\n *\r\n * @param {Node} node - The DOM node where the cursor should be placed at the start.\r\n */\r\nfunction moveCursorToStart(node) {\r\n    const selection = window.getSelection();\r\n    if (!selection)\r\n        return;\r\n    // Clear any existing selections to avoid conflicts\r\n    selection.removeAllRanges();\r\n    // Create a new range and collapse it to the start of the node\r\n    const range = document.createRange();\r\n    range.selectNodeContents(node);\r\n    range.collapse(true); // Move to the start\r\n    // Apply the new selection\r\n    selection.addRange(range);\r\n}\r\n\n\n//# sourceURL=webpack://SelectionJS/./src/cursor.ts?");

/***/ }),

/***/ "./src/elements.ts":
/*!*************************!*\
  !*** ./src/elements.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearSelection: () => (/* binding */ clearSelection),\n/* harmony export */   getSelectionRange: () => (/* binding */ getSelectionRange),\n/* harmony export */   getUpdatedText: () => (/* binding */ getUpdatedText),\n/* harmony export */   isElementInsideContainer: () => (/* binding */ isElementInsideContainer),\n/* harmony export */   isRangeInsideContainer: () => (/* binding */ isRangeInsideContainer)\n/* harmony export */ });\n/**\r\n * @fileoverview Utility functions to handle text selection and range manipulations.\r\n * These functions help in checking if selections are inside specific containers,\r\n * retrieving text selections, and clearing selections when needed.\r\n *\r\n * @author Deepansu Mor\r\n * @github deepansumor\r\n * @email deepansumor@gmail.com\r\n */\r\n/**\r\n * Checks if a given range is fully inside the specified container(s).\r\n * This ensures that modifications only occur within allowed elements.\r\n *\r\n * @param {Range} range - The text selection range to check.\r\n * @param {HTMLElement | HTMLElement[]} container - The container(s) in which the range should be checked.\r\n * @returns {boolean} - Returns true if the range is fully inside the container, otherwise false.\r\n */\r\nfunction isRangeInsideContainer(range, container) {\r\n    const commonAncestor = range.commonAncestorContainer;\r\n    if (Array.isArray(container)) {\r\n        return container.some(cont => cont.contains(commonAncestor));\r\n    }\r\n    else {\r\n        return container.contains(commonAncestor);\r\n    }\r\n}\r\n/**\r\n * Checks if a given element is inside the specified container(s).\r\n * This function is useful to ensure modifications are applied only within allowed elements.\r\n *\r\n * @param {HTMLElement} element - The element to check.\r\n * @param {HTMLElement | HTMLElement[]} container - The container(s) to check against.\r\n * @returns {boolean} - Returns true if the element is inside the container, otherwise false.\r\n */\r\nfunction isElementInsideContainer(element, container) {\r\n    if (Array.isArray(container)) {\r\n        return container.some(cont => cont.contains(element));\r\n    }\r\n    else {\r\n        return container.contains(element);\r\n    }\r\n}\r\n/**\r\n * Retrieves the current text selection and its range.\r\n * This is useful for determining what text the user has selected for modification.\r\n *\r\n * @returns {{ text: string; range: Range } | null} - The selected text and its range, or null if no selection is present.\r\n */\r\nfunction getSelectionRange() {\r\n    const selection = window.getSelection();\r\n    if (!selection || selection.rangeCount === 0)\r\n        return null;\r\n    const range = selection.getRangeAt(0);\r\n    const text = selection.toString().trim();\r\n    if (!text)\r\n        return null;\r\n    return { text, range };\r\n}\r\n/**\r\n * Retrieves the updated text from the given range after modification.\r\n * Useful for confirming changes to a selection.\r\n *\r\n * @param {Range} range - The selection range from which to retrieve the updated text.\r\n * @returns {string} - The modified text within the range.\r\n */\r\nfunction getUpdatedText(range) {\r\n    const container = document.createElement(\"div\");\r\n    container.appendChild(range.cloneContents());\r\n    return container.textContent || \"\";\r\n}\r\n/**\r\n * Clears the current text selection.\r\n * This is useful after modifications to prevent unintended edits.\r\n */\r\nfunction clearSelection() {\r\n    var _a;\r\n    (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();\r\n}\r\n\n\n//# sourceURL=webpack://SelectionJS/./src/elements.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection */ \"./src/selection.ts\");\n// index.ts\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_selection__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\n\n//# sourceURL=webpack://SelectionJS/./src/index.ts?");

/***/ }),

/***/ "./src/selection.ts":
/*!**************************!*\
  !*** ./src/selection.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SelectionJS: () => (/* binding */ SelectionJS),\n/* harmony export */   \"default\": () => (/* binding */ SelectionJS)\n/* harmony export */ });\n/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ \"./src/elements.ts\");\n/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cursor */ \"./src/cursor.ts\");\n/**\r\n * SelectionJS - A JavaScript library for handling text selection and modifications.\r\n * @author Deepansu Mor\r\n * @github https://github.com/deepansumor\r\n */\r\n\r\n\r\nclass SelectionJS {\r\n    /** Getter method to access options safely */\r\n    static getOptions() {\r\n        return this.options;\r\n    }\r\n    /**\r\n     * Configures SelectionJS with options and initializes event listeners.\r\n     * @param {SelectionOptions} options - Configuration options.\r\n     */\r\n    static configure(options = {}) {\r\n        this.options = options;\r\n        this.init();\r\n    }\r\n    /**\r\n     * Registers a middleware function to transform the text before insertion.\r\n     * @param {SelectionMiddleware} middlewareFn - Middleware function.\r\n     */\r\n    static use(middlewareFn) {\r\n        this.middleware.push(middlewareFn);\r\n    }\r\n    static init() {\r\n        if (this.initialized)\r\n            return;\r\n        this.initialized = true;\r\n        const debounce = (fn, delay = 300) => {\r\n            return () => {\r\n                if (this.debounceTimer)\r\n                    clearTimeout(this.debounceTimer);\r\n                this.debounceTimer = window.setTimeout(fn, delay);\r\n            };\r\n        };\r\n        document.addEventListener(\"touchend\", debounce(this.processSelection));\r\n        document.addEventListener(\"mouseup\", debounce(this.processSelection));\r\n    }\r\n    /**\r\n     * Processes user text selection and triggers selection events.\r\n     * Only applies to contentEditable elements.\r\n     */\r\n    static processSelection() {\r\n        const activeEl = document.activeElement;\r\n        let context = null;\r\n        if (activeEl && (activeEl.tagName === \"INPUT\" || activeEl.tagName === \"TEXTAREA\")) {\r\n            const input = activeEl;\r\n            const start = input.selectionStart || 0;\r\n            const end = input.selectionEnd || 0;\r\n            let selectedText = input.value.substring(start, end).trim();\r\n            if (!selectedText)\r\n                return;\r\n            selectedText = SelectionJS.applyMiddleware(selectedText);\r\n            if (!SelectionJS.isInsideContainer(input))\r\n                return;\r\n            context = {\r\n                text: selectedText,\r\n                range: null,\r\n                modify: (modification) => SelectionJS.handleModification(input, modification)\r\n            };\r\n        }\r\n        else {\r\n            const selection = (0,_elements__WEBPACK_IMPORTED_MODULE_0__.getSelectionRange)();\r\n            if (!selection || !selection.text)\r\n                return;\r\n            let { text, range } = selection;\r\n            text = SelectionJS.applyMiddleware(text);\r\n            if (!SelectionJS.isInsideContainer(range))\r\n                return;\r\n            context = {\r\n                text,\r\n                range,\r\n                modify: (modification) => SelectionJS.handleModification(range, modification)\r\n            };\r\n        }\r\n        if (context) {\r\n            SelectionJS.modify = context.modify;\r\n            SelectionJS.triggerEvent(\"select\", context);\r\n        }\r\n    }\r\n    /**\r\n     * Applies middleware transformations to the selected text.\r\n     */\r\n    static applyMiddleware(text) {\r\n        for (const mw of SelectionJS.middleware) {\r\n            text = mw(text);\r\n        }\r\n        return text;\r\n    }\r\n    /**\r\n     * Checks if the selection is inside the allowed container.\r\n     */\r\n    static isInsideContainer(element) {\r\n        if (!SelectionJS.options.container)\r\n            return true;\r\n        const containers = Array.isArray(SelectionJS.options.container) ? SelectionJS.options.container : [SelectionJS.options.container];\r\n        return containers.some(container => element instanceof Range ? (0,_elements__WEBPACK_IMPORTED_MODULE_0__.isRangeInsideContainer)(element, container) : (0,_elements__WEBPACK_IMPORTED_MODULE_0__.isElementInsideContainer)(element, container));\r\n    }\r\n    /**\r\n     * Handles modification for both input fields and contentEditable elements.\r\n     */\r\n    static handleModification(target, modification) {\r\n        let modText = SelectionJS.applyMiddleware(modification.text);\r\n        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {\r\n            applyInputModification(target, Object.assign(Object.assign({}, modification), { text: modText }));\r\n            SelectionJS.triggerEvent(\"update\", { text: target.value, range: null, modify: SelectionJS.modify });\r\n        }\r\n        else {\r\n            applyModification(target, Object.assign(Object.assign({}, modification), { text: modText }));\r\n            const updatedText = (0,_elements__WEBPACK_IMPORTED_MODULE_0__.getUpdatedText)(target);\r\n            SelectionJS.triggerEvent(\"update\", { text: updatedText, range: target, modify: SelectionJS.modify });\r\n        }\r\n    }\r\n    /**\r\n     * Registers an event listener for selection-related events.\r\n     */\r\n    static on(event, callback) {\r\n        if (!this.eventListeners.has(event)) {\r\n            this.eventListeners.set(event, []);\r\n        }\r\n        this.eventListeners.get(event).push(callback);\r\n    }\r\n    /**\r\n     * Unregisters an event listener.\r\n     */\r\n    static off(event, callback) {\r\n        const listeners = this.eventListeners.get(event);\r\n        if (!listeners)\r\n            return;\r\n        this.eventListeners.set(event, listeners.filter(listener => listener !== callback));\r\n    }\r\n    /**\r\n     * Triggers a registered event with the provided context.\r\n     */\r\n    static triggerEvent(event, context) {\r\n        var _a;\r\n        const listeners = (_a = this.eventListeners.get(event)) !== null && _a !== void 0 ? _a : [];\r\n        listeners.forEach(callback => callback(context));\r\n    }\r\n}\r\nSelectionJS.eventListeners = new Map();\r\nSelectionJS.middleware = [];\r\nSelectionJS.initialized = false;\r\nSelectionJS.options = {};\r\nSelectionJS.debounceTimer = null;\r\nSelectionJS.configure();\r\n\r\n/**\r\n * Applies modifications to the selected text for non-input fields.\r\n */\r\nfunction applyModification(range, modification) {\r\n    if (!modification.text)\r\n        return;\r\n    const { action, text } = modification;\r\n    const placeholder = SelectionJS.getOptions().wrapperPlaceholder || \"$\"; // Use getter\r\n    let newNode;\r\n    if (action === \"wrap\" && text) {\r\n        if (!text.includes(placeholder)) {\r\n            console.warn(`Wrapper template \"${text}\" does not include the placeholder \"${placeholder}\".`);\r\n            newNode = document.createTextNode(text); // Fallback to text node\r\n        }\r\n        else {\r\n            const contents = range.extractContents();\r\n            const selectedText = contents.textContent || \"\";\r\n            const wrappedHTML = text.replace(placeholder, selectedText);\r\n            // Create a container to parse HTML\r\n            const tempContainer = document.createElement(\"div\");\r\n            tempContainer.innerHTML = wrappedHTML;\r\n            if (tempContainer.childNodes.length === 1) {\r\n                newNode = tempContainer.firstChild;\r\n            }\r\n            else {\r\n                newNode = document.createDocumentFragment();\r\n                while (tempContainer.firstChild) {\r\n                    newNode.appendChild(tempContainer.firstChild);\r\n                }\r\n            }\r\n        }\r\n    }\r\n    else {\r\n        newNode = document.createTextNode(text);\r\n    }\r\n    if (action === \"wrap\") {\r\n        range.deleteContents();\r\n        range.insertNode(newNode);\r\n        (0,_cursor__WEBPACK_IMPORTED_MODULE_1__.moveCursorToEnd)(newNode);\r\n    }\r\n    else if (action === \"append\") {\r\n        range.collapse(false);\r\n        range.insertNode(newNode);\r\n        (0,_cursor__WEBPACK_IMPORTED_MODULE_1__.moveCursorToEnd)(newNode);\r\n    }\r\n    else if (action === \"prepend\") {\r\n        range.collapse(true);\r\n        range.insertNode(newNode);\r\n        (0,_cursor__WEBPACK_IMPORTED_MODULE_1__.moveCursorToStart)(newNode);\r\n    }\r\n    else if (action === \"replace\") {\r\n        range.deleteContents();\r\n        range.insertNode(newNode);\r\n        (0,_cursor__WEBPACK_IMPORTED_MODULE_1__.moveCursorToEnd)(newNode);\r\n    }\r\n    (0,_elements__WEBPACK_IMPORTED_MODULE_0__.clearSelection)();\r\n}\r\n/**\r\n * Applies modifications to input fields and textareas.\r\n */\r\nfunction applyInputModification(input, modification) {\r\n    const start = input.selectionStart || 0;\r\n    const end = input.selectionEnd || 0;\r\n    const value = input.value;\r\n    const selectedText = value.substring(start, end);\r\n    if (modification.action === \"replace\") {\r\n        input.value = value.substring(0, start) + modification.text + value.substring(end);\r\n        input.selectionStart = input.selectionEnd = start + modification.text.length;\r\n    }\r\n    else if (modification.action === \"append\") {\r\n        input.value = value.substring(0, end) + modification.text + value.substring(end);\r\n        input.selectionStart = input.selectionEnd = end + modification.text.length;\r\n    }\r\n    else if (modification.action === \"prepend\") {\r\n        input.value = value.substring(0, start) + modification.text + value.substring(start);\r\n        input.selectionStart = input.selectionEnd = start + modification.text.length;\r\n    }\r\n    else if (modification.action === \"wrap\") {\r\n        const placeholder = SelectionJS.getOptions().wrapperPlaceholder || \"$\";\r\n        if (!modification.text.includes(placeholder)) {\r\n            console.warn(`Wrapper template \"${modification.text}\" does not include the placeholder \"${placeholder}\".`);\r\n            return;\r\n        }\r\n        const wrappedText = modification.text.replace(placeholder, selectedText);\r\n        input.value = value.substring(0, start) + wrappedText + value.substring(end);\r\n        input.selectionStart = start;\r\n        input.selectionEnd = start + wrappedText.length;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://SelectionJS/./src/selection.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	SelectionJS = __webpack_exports__["default"];
/******/ 	
/******/ })()
;