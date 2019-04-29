const ora = require("ora");
const rm = require("rimraf");
const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../config/webpack.config");
const tools = require("../tools");
const path = require("path");
const PATHS = require("../config/path");

module.exports = (cmd) => {
    tools
        .spawnAsync("npm", ["run", "build"], {
            stdio: "inherit",
            cwd: path.resolve(__dirname, ".."),
            env: {
                prot: process.env.prot,
                project: PATHS.projectDirectory
            }
        })
        .then(() => {
            console.log("ok");
        })
        .catch((error) => {
            console.log(error.message);
        });

    // webpack(webpackConfig, (err, stats) => {
    //     process.stdout.write(
    //         stats.toString({
    //             colors: true,
    //             modules: false,
    //             children: false,
    //             chunks: false,
    //             chunkModules: false
    //         }) + "\n\n"
    //     );
    //     if (stats.hasErrors()) {
    //         console.log(chalk.red("  编译错误.\n"));
    //         process.exit(1);
    //     }
    //     console.log(chalk.cyan("  编译完毕.\n"));
    // });
};
