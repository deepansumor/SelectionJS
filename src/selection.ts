/**
 * SelectionJS - A JavaScript library for handling text selection and modifications.
 * @author Deepansu Mor
 * @github https://github.com/deepansumor
 */

import {
    SelectionContext,
    SelectionEvent,
    SelectionCallback,
    SelectionAction,
    SelectionMiddleware,
    SelectionOptions
} from "./types";
import {
    isRangeInsideContainer,
    getSelectionRange,
    getUpdatedText,
    isElementInsideContainer,
    clearSelection
} from "./elements";
import { moveCursorToEnd, moveCursorToStart } from "./cursor";

export default class SelectionJS {
    private static eventListeners: Map<SelectionEvent, SelectionCallback[]> = new Map();
    private static middleware: SelectionMiddleware[] = [];
    private static initialized = false;
    private static options: SelectionOptions = {};
    private static modify: SelectionContext["modify"];

    /** Getter method to access options safely */
    static getOptions(): SelectionOptions {
        return this.options;
    }

    /**
     * Configures SelectionJS with options and initializes event listeners.
     * @param {SelectionOptions} options - Configuration options.
     */
    static configure(options: SelectionOptions = {}) {
        this.options = options;
        this.init();
    }

    /**
     * Registers a middleware function to transform the text before insertion.
     * @param {SelectionMiddleware} middlewareFn - Middleware function.
     */
    static use(middlewareFn: SelectionMiddleware) {
        this.middleware.push(middlewareFn);
    }

    private static debounceTimer: number | null = null;

    private static init() {
        if (this.initialized) return;
        this.initialized = true;

        const debounce = (fn: () => void, delay = 300) => {
            return () => {
                if (this.debounceTimer) clearTimeout(this.debounceTimer);
                this.debounceTimer = window.setTimeout(fn, delay);
            };
        };

        document.addEventListener("touchend", debounce(this.processSelection));
        document.addEventListener("mouseup",debounce(this.processSelection));
    }


    /**
     * Processes user text selection and triggers selection events.
     * Only applies to contentEditable elements.
     */
    private static processSelection() {
        const activeEl = document.activeElement;
        let context: SelectionContext | null = null;

        if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
            const input = activeEl as HTMLInputElement | HTMLTextAreaElement;
            const start = input.selectionStart || 0;
            const end = input.selectionEnd || 0;
            let selectedText = input.value.substring(start, end).trim();
            if (!selectedText) return;

            selectedText = SelectionJS.applyMiddleware(selectedText);
            if (!SelectionJS.isInsideContainer(input)) return;

            context = {
                text: selectedText,
                range: null,
                modify: (modification) => SelectionJS.handleModification(input, modification)
            };
        } else {
            const selection = getSelectionRange();
            if (!selection || !selection.text) return;

            let { text, range } = selection;
            text = SelectionJS.applyMiddleware(text);
            if (!SelectionJS.isInsideContainer(range)) return;

            context = {
                text,
                range,
                modify: (modification) => SelectionJS.handleModification(range, modification)
            };
        }

        if (context) {
            SelectionJS.modify = context.modify;
            SelectionJS.triggerEvent("select", context);
        }
    }

    /**
     * Applies middleware transformations to the selected text.
     */
    private static applyMiddleware(text: string): string {
        for (const mw of SelectionJS.middleware) {
            text = mw(text);
        }
        return text;
    }

    /**
     * Checks if the selection is inside the allowed container.
     */
    private static isInsideContainer(element: HTMLElement | Range): boolean {
        if (!SelectionJS.options.container) return true;

        const containers = Array.isArray(SelectionJS.options.container) ? SelectionJS.options.container : [SelectionJS.options.container];
        return containers.some(container =>
            element instanceof Range ? isRangeInsideContainer(element, container) : isElementInsideContainer(element, container)
        );
    }

    /**
     * Handles modification for both input fields and contentEditable elements.
     */
    private static handleModification(target: HTMLInputElement | HTMLTextAreaElement | Range, modification: { action: SelectionAction; text: string }) {
        let modText = SelectionJS.applyMiddleware(modification.text);

        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
            applyInputModification(target, { ...modification, text: modText });
            SelectionJS.triggerEvent("update", { text: target.value, range: null, modify: SelectionJS.modify });
        } else {
            applyModification(target, { ...modification, text: modText });
            const updatedText = getUpdatedText(target);
            SelectionJS.triggerEvent("update", { text: updatedText, range: target, modify: SelectionJS.modify });
        }
    }


    /**
     * Registers an event listener for selection-related events.
     */
    static on(event: SelectionEvent, callback: SelectionCallback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event)!.push(callback);
    }

    /**
     * Unregisters an event listener.
     */
    static off(event: SelectionEvent, callback: SelectionCallback) {
        const listeners = this.eventListeners.get(event);
        if (!listeners) return;
        this.eventListeners.set(event, listeners.filter(listener => listener !== callback));
    }

    /**
     * Triggers a registered event with the provided context.
     */
    private static triggerEvent(event: SelectionEvent, context: SelectionContext) {
        const listeners = this.eventListeners.get(event) ?? [];
        listeners.forEach(callback => callback(context));
    }
}

SelectionJS.configure();
export { SelectionJS };

/**
 * Applies modifications to the selected text for non-input fields.
 */
function applyModification(
    range: Range,
    modification: { action: SelectionAction; text: string; wrapper?: string }
) {
    if (!modification.text) return;

    const { action, text } = modification;
    const placeholder = SelectionJS.getOptions().wrapperPlaceholder || "$"; // Use getter

    let newNode: Node;

    if (action === "wrap" && text) {
        if (!text.includes(placeholder)) {
            console.warn(`Wrapper template "${text}" does not include the placeholder "${placeholder}".`);
            newNode = document.createTextNode(text); // Fallback to text node
        } else {
            const contents = range.extractContents();
            const selectedText = contents.textContent || "";
            const wrappedHTML = text.replace(placeholder, selectedText);

            // Create a container to parse HTML
            const tempContainer = document.createElement("div");
            tempContainer.innerHTML = wrappedHTML;

            if (tempContainer.childNodes.length === 1) {
                newNode = tempContainer.firstChild!;
            } else {
                newNode = document.createDocumentFragment();
                while (tempContainer.firstChild) {
                    (newNode as DocumentFragment).appendChild(tempContainer.firstChild);
                }
            }
        }
    } else {
        newNode = document.createTextNode(text);
    }

    if (action === "wrap") {
        range.deleteContents();
        range.insertNode(newNode);
        moveCursorToEnd(newNode);
    } else if (action === "append") {
        range.collapse(false);
        range.insertNode(newNode);
        moveCursorToEnd(newNode);
    } else if (action === "prepend") {
        range.collapse(true);
        range.insertNode(newNode);
        moveCursorToStart(newNode);
    } else if (action === "replace") {
        range.deleteContents();
        range.insertNode(newNode);
        moveCursorToEnd(newNode);
    }

    clearSelection();
}

/**
 * Applies modifications to input fields and textareas.
 */
function applyInputModification(
    input: HTMLInputElement | HTMLTextAreaElement,
    modification: { action: SelectionAction; text: string }
) {
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const value = input.value;
    const selectedText = value.substring(start, end);

    if (modification.action === "replace") {
        input.value = value.substring(0, start) + modification.text + value.substring(end);
        input.selectionStart = input.selectionEnd = start + modification.text.length;
    } else if (modification.action === "append") {
        input.value = value.substring(0, end) + modification.text + value.substring(end);
        input.selectionStart = input.selectionEnd = end + modification.text.length;
    } else if (modification.action === "prepend") {
        input.value = value.substring(0, start) + modification.text + value.substring(start);
        input.selectionStart = input.selectionEnd = start + modification.text.length;
    } else if (modification.action === "wrap") {
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
