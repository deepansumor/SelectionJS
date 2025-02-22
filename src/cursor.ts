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
export function moveCursorToEnd(node: Node): void {
    const selection = window.getSelection();
    if (!selection) return;
    
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
export function moveCursorToStart(node: Node): void {
    const selection = window.getSelection();
    if (!selection) return;
    
    // Clear any existing selections to avoid conflicts
    selection.removeAllRanges();
    
    // Create a new range and collapse it to the start of the node
    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(true); // Move to the start
    
    // Apply the new selection
    selection.addRange(range);
}