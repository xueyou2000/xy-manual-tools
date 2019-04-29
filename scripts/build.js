const ora = require("ora");
const rm = require("rimraf");
const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const tools = require("../tools");
const path = require("path");

module.exports = (project_directory, cmd) => {
    tools
        .spawnAsync("npm", ["run", "build"], {
            stdio: "inherit",
            cwd: path.resolve(__dirname, "..")
        })
        .then(() => {
            console.log("ok");
        })
        .catch((error) => {
            console.log(error.message);
        });
};
