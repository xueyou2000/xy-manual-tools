const path = require("path");
const PATHS = require("./path");

module.exports = () => {
    return {
        mode: "production",
        entry: PATHS.resolveCodebox("polyfill.js"),
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        output: {
            path: path.resolve(__dirname, "../static"),
            filename: "js/polyfill.js"
        }
    };
};
