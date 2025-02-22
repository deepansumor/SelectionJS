const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "selection.js",
        path: path.resolve(__dirname, "dist"),
        library: "SelectionJS",
        libraryTarget: "var",
        globalObject: "globalThis",
        libraryExport: "default"  // Ensure the default export is directly assigned
    },
    mode:"development",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};
