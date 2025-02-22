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
export function isRangeInsideContainer(range: Range, container: HTMLElement | HTMLElement[]): boolean {
    const commonAncestor = range.commonAncestorContainer;
    if (Array.isArray(container)) {
        return container.some(cont => cont.contains(commonAncestor as Node));
    } else {
        return container.contains(commonAncestor as Node);
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
export function isElementInsideContainer(element: HTMLElement, container: HTMLElement | HTMLElement[]): boolean {
    if (Array.isArray(container)) {
        return container.some(cont => cont.contains(element));
    } else {
        return container.contains(element);
    }
}

/**
 * Retrieves the current text selection and its range.
 * This is useful for determining what text the user has selected for modification.
 *
 * @returns {{ text: string; range: Range } | null} - The selected text and its range, or null if no selection is present.
 */
export function getSelectionRange(): { text: string; range: Range } | null {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();
    if (!text) return null;

    return { text, range };
}

/**
 * Retrieves the updated text from the given range after modification.
 * Useful for confirming changes to a selection.
 *
 * @param {Range} range - The selection range from which to retrieve the updated text.
 * @returns {string} - The modified text within the range.
 */
export function getUpdatedText(range: Range): string {
    const container = document.createElement("div");
    container.appendChild(range.cloneContents());
    return container.textContent || "";
}

/**
 * Clears the current text selection.
 * This is useful after modifications to prevent unintended edits.
 */
export function clearSelection(): void {
    window.getSelection()?.removeAllRanges();
}