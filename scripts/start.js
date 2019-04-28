const ora = require("ora");
const rm = require("rimraf");
const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../config/webpack.dev.config")();
const tools = require("../config/tools");
const path = require("path");

module.exports = (project_directory, cmd) => {
    console.log(webpackConfig.resolve.alias);
    tools
        .spawnAsync("npm", ["run", "dev"], {
            stdio: "inherit",
            cwd: path.resolve(__dirname, "..")
        })
        .then(() => {
            console.log("ok");
        })
        .catch((error) => {
            console.log(error.message);
        });

    // const compiler = webpack(webpackConfig);
    // const server = new WebpackDevServer(compiler, {
    //     open: true
    // });
    // server.listen(webpackConfig.devServer.port);
};
