/**
 * @fileoverview Type definitions for selection manipulation.
 * These types define the structure of selection actions, contexts, middleware, and options.
 * 
 * @author Deepansu Mor
 * @github deepansumor
 * @email deepansumor@gmail.com
 */

/**
 * Defines possible actions for modifying selected text.
 * - "append": Add text after the selected content.
 * - "prepend": Add text before the selected content.
 * - "replace": Replace the selected content with new text.
 * - "wrap": Wrap the selected content with a specified wrapper.
 */
export type SelectionAction = "append" | "prepend" | "replace" | "wrap";

/**
 * Represents the context of a text selection.
 * Includes the selected text, the selection range (if applicable),
 * and a method to modify the selection.
 */
export interface SelectionContext {
    text: string;
    range: Range | null; // For input/textarea fields, range is null.
    modify: (modification: { action: SelectionAction; text: string; wrapper?: string }) => void;
}

/**
 * Defines the possible selection events that can be listened to.
 * - "select": Triggered when text is selected.
 * - "update": Triggered when the selection is modified.
 */
export type SelectionEvent = "select" | "update";

/**
 * Callback function type for handling selection events.
 */
export type SelectionCallback = (context: SelectionContext) => void;

/**
 * Middleware function type for transforming text before insertion.
 * Accepts the original text and returns the transformed version.
 */
export type SelectionMiddleware = (text: string) => string;

/**
 * Configuration options for selection handling.
 * - "container": Restricts selection processing to specific container(s).
 */
export interface SelectionOptions {
    container?: HTMLElement | HTMLElement[];
    wrapperPlaceholder?: string
}
