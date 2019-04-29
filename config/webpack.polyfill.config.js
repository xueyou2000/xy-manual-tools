const path = require("path");

module.exports = () => {
    return {
        mode: "production",
        entry: path.resolve(__dirname, "../tools/polyfill.js"),
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        output: {
            path: path.resolve(__dirname, "../static"),
            filename: "js/polyfill.js"
        }
    };
};
