/**
 * SelectionJS - A JavaScript library for handling text selection and modifications.
 * @author Deepansu Mor
 * @github https://github.com/deepansumor
 */
import { SelectionEvent, SelectionCallback, SelectionMiddleware, SelectionOptions } from "./types";
export default class SelectionJS {
    private static eventListeners;
    private static middleware;
    private static initialized;
    private static options;
    private static modify;
    /** Getter method to access options safely */
    static getOptions(): SelectionOptions;
    /**
     * Configures SelectionJS with options and initializes event listeners.
     * @param {SelectionOptions} options - Configuration options.
     */
    static configure(options?: SelectionOptions): void;
    /**
     * Registers a middleware function to transform the text before insertion.
     * @param {SelectionMiddleware} middlewareFn - Middleware function.
     */
    static use(middlewareFn: SelectionMiddleware): void;
    private static debounceTimer;
    private static init;
    /**
     * Processes user text selection and triggers selection events.
     * Only applies to contentEditable elements.
     */
    private static processSelection;
    /**
     * Applies middleware transformations to the selected text.
     */
    private static applyMiddleware;
    /**
     * Checks if the selection is inside the allowed container.
     */
    private static isInsideContainer;
    /**
     * Handles modification for both input fields and contentEditable elements.
     */
    private static handleModification;
    /**
     * Registers an event listener for selection-related events.
     */
    static on(event: SelectionEvent, callback: SelectionCallback): void;
    /**
     * Unregisters an event listener.
     */
    static off(event: SelectionEvent, callback: SelectionCallback): void;
    /**
     * Triggers a registered event with the provided context.
     */
    private static triggerEvent;
}
export { SelectionJS };
