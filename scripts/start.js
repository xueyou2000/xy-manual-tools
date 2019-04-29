const ora = require("ora");
const rm = require("rimraf");
const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../config/webpack.dev.config");
const tools = require("../tools");
const path = require("path");
const PATHS = require("../config/path");

module.exports = (cmd) => {
    process.env.prot = cmd.prot || "8080";
    tools
        .spawnAsync("npm", ["run", "dev"], {
            stdio: "inherit",
            cwd: path.resolve(__dirname, ".."),
            env: {
                prot: process.env.prot,
                project: PATHS.projectDirectory
            }
        })
        .then(() => {
            console.log("编译完毕");
        })
        .catch((error) => {
            console.log(error.message);
        });
    // const config = webpackConfig();

    // const compiler = webpack(config);
    // const server = new WebpackDevServer(compiler, {
    //     open: true,
    //     contentBase: PATHS.projectDirectory
    // });
    // server.listen(config.devServer.port);
};
