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
export declare function moveCursorToEnd(node: Node): void;
/**
 * Moves the cursor (selection) to the start of the inserted node.
 * This ensures that the user starts typing before the newly inserted content.
 *
 * @param {Node} node - The DOM node where the cursor should be placed at the start.
 */
export declare function moveCursorToStart(node: Node): void;
