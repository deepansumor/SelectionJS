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
export declare function isRangeInsideContainer(range: Range, container: HTMLElement | HTMLElement[]): boolean;
/**
 * Checks if a given element is inside the specified container(s).
 * This function is useful to ensure modifications are applied only within allowed elements.
 *
 * @param {HTMLElement} element - The element to check.
 * @param {HTMLElement | HTMLElement[]} container - The container(s) to check against.
 * @returns {boolean} - Returns true if the element is inside the container, otherwise false.
 */
export declare function isElementInsideContainer(element: HTMLElement, container: HTMLElement | HTMLElement[]): boolean;
/**
 * Retrieves the current text selection and its range.
 * This is useful for determining what text the user has selected for modification.
 *
 * @returns {{ text: string; range: Range } | null} - The selected text and its range, or null if no selection is present.
 */
export declare function getSelectionRange(): {
    text: string;
    range: Range;
} | null;
/**
 * Retrieves the updated text from the given range after modification.
 * Useful for confirming changes to a selection.
 *
 * @param {Range} range - The selection range from which to retrieve the updated text.
 * @returns {string} - The modified text within the range.
 */
export declare function getUpdatedText(range: Range): string;
/**
 * Clears the current text selection.
 * This is useful after modifications to prevent unintended edits.
 */
export declare function clearSelection(): void;
