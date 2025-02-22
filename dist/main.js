var SelectionJS;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cursor.ts":
/*!***********************!*\
  !*** ./src/cursor.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   moveCursorToEnd: () => (/* binding */ moveCursorToEnd),
/* harmony export */   moveCursorToStart: () => (/* binding */ moveCursorToStart)
/* harmony export */ });
/**
 * @fileoverview Utility functions to move the cursor (selection) to specific positions.
 * These functions are useful when modifying selected text dynamically.
 *
 * @author Deepansu Mor
 * @github deepansumor
 * @email deepansumor@gmail.com
 */
/**
 * Moves the cursor (selection) to the end of the inserted node.
 * This ensures that the user continues typing after the newly inserted content.
 *
 * @param {Node} node - The DOM node where the cursor should be placed at the end.
 */
function moveCursorToEnd(node) {
    const selection = window.getSelection();
    if (!selection)
        return;
    // Clear any existing selections to avoid conflicts
    selection.removeAllRanges();
    // Create a new range and collapse it to the end of the node
    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false); // Move to the end
    // Apply the new selection
    selection.addRange(range);
}
/**
 * Moves the cursor (selection) to the start of the inserted node.
 * This ensures that the user starts typing before the newly inserted content.
 *
 * @param {Node} node - The DOM node where the cursor should be placed at the start.
 */
function moveCursorToStart(node) {
    const selection = window.getSelection();
    if (!selection)
        return;
    // Clear any existing selections to avoid conflicts
    selection.removeAllRanges();
    // Create a new range and collapse it to the start of the node
    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(true); // Move to the start
    // Apply the new selection
    selection.addRange(range);
}


/***/ }),

/***/ "./src/elements.ts":
/*!*************************!*\
  !*** ./src/elements.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearSelection: () => (/* binding */ clearSelection),
/* harmony export */   getSelectionRange: () => (/* binding */ getSelectionRange),
/* harmony export */   getUpdatedText: () => (/* binding */ getUpdatedText),
/* harmony export */   isElementInsideContainer: () => (/* binding */ isElementInsideContainer),
/* harmony export */   isRangeInsideContainer: () => (/* binding */ isRangeInsideContainer)
/* harmony export */ });
/**
 * @fileoverview Utility functions to handle text selection and range manipulations.
 * These functions help in checking if selections are inside specific containers,
 * retrieving text selections, and clearing selections when needed.
 *
 * @author Deepansu Mor
 * @github deepansumor
 * @email deepansumor@gmail.com
 */
/**
 * Checks if a given range is fully inside the specified container(s).
 * This ensures that modifications only occur within allowed elements.
 *
 * @param {Range} range - The text selection range to check.
 * @param {HTMLElement | HTMLElement[]} container - The container(s) in which the range should be checked.
 * @returns {boolean} - Returns true if the range is fully inside the container, otherwise false.
 */
function isRangeInsideContainer(range, container) {
    const commonAncestor = range.commonAncestorContainer;
    if (Array.isArray(container)) {
        return container.some(cont => cont.contains(commonAncestor));
    }
    else {
        return container.contains(commonAncestor);
    }
}
/**
 * Checks if a given element is inside the specified container(s).
 * This function is useful to ensure modifications are applied only within allowed elements.
 *
 * @param {HTMLElement} element - The element to check.
 * @param {HTMLElement | HTMLElement[]} container - The container(s) to check against.
 * @returns {boolean} - Returns true if the element is inside the container, otherwise false.
 */
function isElementInsideContainer(element, container) {
    if (Array.isArray(container)) {
        return container.some(cont => cont.contains(element));
    }
    else {
        return container.contains(element);
    }
}
/**
 * Retrieves the current text selection and its range.
 * This is useful for determining what text the user has selected for modification.
 *
 * @returns {{ text: string; range: Range } | null} - The selected text and its range, or null if no selection is present.
 */
function getSelectionRange() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0)
        return null;
    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();
    if (!text)
        return null;
    return { text, range };
}
/**
 * Retrieves the updated text from the given range after modification.
 * Useful for confirming changes to a selection.
 *
 * @param {Range} range - The selection range from which to retrieve the updated text.
 * @returns {string} - The modified text within the range.
 */
function getUpdatedText(range) {
    const container = document.createElement("div");
    container.appendChild(range.cloneContents());
    return container.textContent || "";
}
/**
 * Clears the current text selection.
 * This is useful after modifications to prevent unintended edits.
 */
function clearSelection() {
    var _a;
    (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
}


/***/ }),

/***/ "./src/selection.ts":
/*!**************************!*\
  !*** ./src/selection.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectionJS: () => (/* binding */ SelectionJS),
/* harmony export */   "default": () => (/* binding */ SelectionJS)
/* harmony export */ });
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements */ "./src/elements.ts");
/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cursor */ "./src/cursor.ts");
/**
 * SelectionJS - A JavaScript library for handling text selection and modifications.
 * @author Deepansu Mor
 * @github https://github.com/deepansumor
 */


class SelectionJS {
    /** Getter method to access options safely */
    static getOptions() {
        return this.options;
    }
    /**
     * Configures SelectionJS with options and initializes event listeners.
     * @param {SelectionOptions} options - Configuration options.
     */
    static configure(options = {}) {
        this.options = options;
        this.init();
    }
    /**
     * Registers a middleware function to transform the text before insertion.
     * @param {SelectionMiddleware} middlewareFn - Middleware function.
     */
    static use(middlewareFn) {
        this.middleware.push(middlewareFn);
    }
    /**
     * Initializes event listeners for text selection.
     */
    static init() {
        if (this.initialized)
            return;
        this.initialized = true;
        document.addEventListener("mouseup", SelectionJS.processSelection);
        document.addEventListener("touchend", SelectionJS.processSelection);
    }
    /**
     * Debounced method to process user text selection and trigger selection events.
     */
    static processSelection() {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = window.setTimeout(() => {
            SelectionJS.executeSelectionProcessing();
        }, 200); // Adjust debounce time as needed (200ms)
    }
    /**
     * Executes selection processing logic after debounce delay.
     */
    static executeSelectionProcessing() {
        const activeEl = document.activeElement;
        let context = null;
        if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
            const input = activeEl;
            const start = input.selectionStart || 0;
            const end = input.selectionEnd || 0;
            let selectedText = input.value.substring(start, end).trim();
            if (!selectedText)
                return;
            selectedText = SelectionJS.applyMiddleware(selectedText);
            if (!SelectionJS.isInsideContainer(input))
                return;
            context = {
                text: selectedText,
                range: null,
                modify: (modification) => SelectionJS.handleModification(input, modification)
            };
        }
        else {
            const selection = (0,_elements__WEBPACK_IMPORTED_MODULE_0__.getSelectionRange)();
            if (!selection || !selection.text)
                return;
            let { text, range } = selection;
            text = SelectionJS.applyMiddleware(text);
            if (!SelectionJS.isInsideContainer(range))
                return;
            context = {
                text,
                range,
                modify: (modification) => SelectionJS.handleModification(range, modification)
            };
        }
        if (context) {
            SelectionJS.triggerEvent("select", context);
        }
    }
    /**
     * Applies middleware transformations to the selected text.
     */
    static applyMiddleware(text) {
        for (const mw of SelectionJS.middleware) {
            text = mw(text);
        }
        return text;
    }
    /**
     * Checks if the selection is inside the allowed container.
     */
    static isInsideContainer(element) {
        if (!SelectionJS.options.container)
            return true;
        const containers = Array.isArray(SelectionJS.options.container) ? SelectionJS.options.container : [SelectionJS.options.container];
        return containers.some(container => element instanceof Range ? (0,_elements__WEBPACK_IMPORTED_MODULE_0__.isRangeInsideContainer)(element, container) : (0,_elements__WEBPACK_IMPORTED_MODULE_0__.isElementInsideContainer)(element, container));
    }
    /**
     * Handles modification for both input fields and contentEditable elements.
     */
    static handleModification(target, modification) {
        let modText = SelectionJS.applyMiddleware(modification.text);
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
            applyInputModification(target, Object.assign(Object.assign({}, modification), { text: modText }));
            SelectionJS.triggerEvent("update", { text: target.value, range: null, modify: SelectionJS.modify });
        }
        else {
            applyModification(target, Object.assign(Object.assign({}, modification), { text: modText }));
            const updatedText = (0,_elements__WEBPACK_IMPORTED_MODULE_0__.getUpdatedText)(target);
            SelectionJS.triggerEvent("update", { text: updatedText, range: target, modify: SelectionJS.modify });
        }
    }
    /**
     * Registers an event listener for selection-related events.
     */
    static on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }
    /**
     * Unregisters an event listener.
     */
    static off(event, callback) {
        const listeners = this.eventListeners.get(event);
        if (!listeners)
            return;
        this.eventListeners.set(event, listeners.filter(listener => listener !== callback));
    }
    /**
     * Triggers a registered event with the provided context.
     */
    static triggerEvent(event, context) {
        var _a;
        const listeners = (_a = this.eventListeners.get(event)) !== null && _a !== void 0 ? _a : [];
        listeners.forEach(callback => callback(context));
    }
}
SelectionJS.eventListeners = new Map();
SelectionJS.middleware = [];
SelectionJS.initialized = false;
SelectionJS.options = {};
SelectionJS.debounceTimer = null;
SelectionJS.configure();

/**
 * Applies modifications to the selected text for non-input fields.
 */
function applyModification(range, modification) {
    if (!modification.text)
        return;
    const { action, text } = modification;
    const placeholder = SelectionJS.getOptions().wrapperPlaceholder || "$"; // Use getter
    let newNode;
    if (action === "wrap" && text) {
        if (!text.includes(placeholder)) {
            console.warn(`Wrapper template "${text}" does not include the placeholder "${placeholder}".`);
            newNode = document.createTextNode(text); // Fallback to text node
        }
        else {
            const contents = range.extractContents();
            const selectedText = contents.textContent || "";
            const wrappedHTML = text.replace(placeholder, selectedText);
            // Create a container to parse HTML
            const tempContainer = document.createElement("div");
            tempContainer.innerHTML = wrappedHTML;
            if (tempContainer.childNodes.length === 1) {
                newNode = tempContainer.firstChild;
            }
            else {
                newNode = document.createDocumentFragment();
                while (tempContainer.firstChild) {
                    newNode.appendChild(tempContainer.firstChild);
                }
            }
        }
    }
    else {
        newNode = document.createTextNode(text);
    }
    if (action === "wrap") {
        range.deleteContents();
        range.insertNode(newNode);
        (0,_cursor__WEBPACK_IMPORTED_MODULE_1__.moveCursorToEnd)(newNode);
    }
    else if (action === "append") {
        range.collapse(false);
        range.insertNode(newNode);
        (0,_cursor__WEBPACK_IMPORTED_MODULE_1__.moveCursorToEnd)(newNode);
    }
    else if (action === "prepend") {
        range.collapse(true);
        range.insertNode(newNode);
        (0,_cursor__WEBPACK_IMPORTED_MODULE_1__.moveCursorToStart)(newNode);
    }
    else if (action === "replace") {
        range.deleteContents();
        range.insertNode(newNode);
        (0,_cursor__WEBPACK_IMPORTED_MODULE_1__.moveCursorToEnd)(newNode);
    }
    (0,_elements__WEBPACK_IMPORTED_MODULE_0__.clearSelection)();
}
/**
 * Applies modifications to input fields and textareas.
 */
function applyInputModification(input, modification) {
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const value = input.value;
    const selectedText = value.substring(start, end);
    if (modification.action === "replace") {
        input.value = value.substring(0, start) + modification.text + value.substring(end);
        input.selectionStart = input.selectionEnd = start + modification.text.length;
    }
    else if (modification.action === "append") {
        input.value = value.substring(0, end) + modification.text + value.substring(end);
        input.selectionStart = input.selectionEnd = end + modification.text.length;
    }
    else if (modification.action === "prepend") {
        input.value = value.substring(0, start) + modification.text + value.substring(start);
        input.selectionStart = input.selectionEnd = start + modification.text.length;
    }
    else if (modification.action === "wrap") {
        const placeholder = SelectionJS.getOptions().wrapperPlaceholder || "$";
        if (!modification.text.includes(placeholder)) {
            console.warn(`Wrapper template "${modification.text}" does not include the placeholder "${placeholder}".`);
            return;
        }
        const wrappedText = modification.text.replace(placeholder, selectedText);
        input.value = value.substring(0, start) + wrappedText + value.substring(end);
        input.selectionStart = start;
        input.selectionEnd = start + wrappedText.length;
    }
}


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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection */ "./src/selection.ts");
// index.ts

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_selection__WEBPACK_IMPORTED_MODULE_0__["default"]);

})();

SelectionJS = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=main.js.map