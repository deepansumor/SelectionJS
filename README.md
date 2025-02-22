# SelectionJS

SelectionJS is a lightweight JavaScript library for handling text selection and modifications. It works with `contentEditable` elements, `input` fields, and `textarea`, allowing easy text manipulation, event handling, and middleware-based transformations.

## Features

✅ Select and modify text in `contentEditable`, `input`, and `textarea` elements  
✅ Supports appending, prepending, replacing, and wrapping text  
✅ Event listeners to capture selection and modification events  
✅ Middleware support to process text before modification  
✅ Supports multiple containers for text selection  
✅ Debounced selection processing for optimized performance  

## Installation

### CDN
```html
<script src="../dist/selection.js"></script>
<script src="https://cdn.jsdelivr.net/gh/deepansumor/SelectionJS@latest/dist/selection.min.js"></script>
```

### NPM
```sh
npm install selectionjs
```
```js
import SelectionJS from 'selectionjs';
```

## Usage

### Basic Example
```js
// Initialize SelectionJS
SelectionJS.configure({
    container: document.querySelector(".editable-container"),
    wrapperPlaceholder: "$"
});

// Listen for selection
SelectionJS.on("select", ({ text, modify }) => {
    console.log("Selected Text:", text);
    modify({ action: "wrap", text: "<b>$</b>" });
});
```

### Modifying Input Fields
```js
SelectionJS.on("select", ({ text, modify }) => {
    modify({ action: "prepend", text: "[PRE] " });
});
```

## API Reference

### `SelectionJS.configure(options: SelectionOptions)`
Configures the library.
```js
SelectionJS.configure({
    container: [document.getElementById("editor1"), document.getElementById("editor2")],
    wrapperPlaceholder: "$"
});
```

### `SelectionJS.on(event: SelectionEvent, callback: SelectionCallback)`
Registers an event listener.
```js
SelectionJS.on("update", ({ text }) => {
    console.log("Updated text:", text);
});
```

### `modify({ action, text })`
Modifies selected text.
- **`replace`** - Replaces selection with new text
- **`append`** - Appends text after selection
- **`prepend`** - Adds text before selection
- **`wrap`** - Wraps selection with provided text

Example:
```js
modify({ action: "wrap", text: "<i>$</i>" });
```

## Contributing
1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to branch (`git push origin feature-name`)
5. Open a Pull Request

## License
MIT License

