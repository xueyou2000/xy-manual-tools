const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const PATHS = require("./path");
const tools = require("../tools");
const fs = require("fs-extra");

const exampleConfigs = tools.createLoadExamplesEntry();
const tsconfig = tools.updateTsconfig();
const { entries, htmlWebpackPlugins } = FindPages();

module.exports = () => {
    const packageJson = tools.getPackageConfig();
    const assetsExist = fs.existsSync(PATHS.resolveProject("./src/assets/index.js"));
    let entry = { main: PATHS.resolveCodebox("main.tsx"), ...entries };
    if (assetsExist) {
        entry["assets"] = PATHS.resolveProject("./src/assets/index.js");
    }

    return {
        mode: "development",
        devtool: "eval-source-map",
        context: PATHS.projectDirectory,
        entry: entry,
        output: {
            path: path.resolve(__dirname, "../pages"),
            filename: "js/[name].js",
            chunkFilename: "js/[name].chunk.js"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
            alias: {
                [`${packageJson.name}$`]: PATHS.resolveProject("./src/index.tsx"),
                [`${packageJson.name}/assets/index`]: PATHS.resolveProject("./src/assets/index.js")
            }
        },
        externals: {
            react: "React",
            "react-dom": "ReactDOM"
        },
        module: {
            rules: [
                {
                    test: /\.(ts)x?$/,
                    include: [PATHS.resolveProject("src"), PATHS.resolveProject("examples"), PATHS.codeboxDirectory],
                    use: {
                        loader: require.resolve("awesome-typescript-loader"),
                        options: {
                            useCache: true,
                            configFileName: tsconfig
                        }
                    }
                },
                {
                    test: /\.css$/,
                    loaders: [require.resolve("style-loader"), require.resolve("css-loader")]
                },
                {
                    test: /\.scss$/,
                    include: [PATHS.resolveProject("src"), PATHS.resolveProject("examples"), PATHS.codeboxDirectory],
                    loaders: [require.resolve("style-loader"), require.resolve("css-loader"), require.resolve("sass-loader")]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loaders: require.resolve("file-loader"),
                    options: {
                        limit: 100,
                        name: "images/[name].[hash:7].[ext]"
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: require.resolve("file-loader"),
                    options: {
                        limit: 100,
                        name: "media/[name].[hash:7].[ext]"
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: require.resolve("file-loader"),
                    options: {
                        limit: 100,
                        name: "fonts/[name].[hash:7].[ext]"
                    }
                }
            ]
        },
        optimization: {
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    components: {
                        test: /xy-(\w+)/,
                        name: "components",
                        chunks: "all",
                        enforce: true,
                        priority: 1
                    },
                    bundle: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "bundle",
                        chunks: "initial",
                        priority: -10
                    }
                }
            }
        },
        plugins: [new CaseSensitivePathsPlugin(), ...htmlWebpackPlugins, new webpack.HashedModuleIdsPlugin(), new FriendlyErrorsWebpackPlugin()]
    };
};

/**
 * 寻找页面
 */
function FindPages() {
    const entries = {};
    const htmlWebpackPlugins = exampleConfigs.map((c) => {
        console.log("✔ \t", c.title, `${c.name}.html`);
        let entryCode = `
        import React from "react";
        import ReactDOM from "react-dom";
        import "../Assets/Styles/rest.css";
        import Demo from "${path
            .normalize(c.filePath)
            .replace(/\\/g, "\\\\")
            .replace(path.extname(c.filePath), "")}";
        ReactDOM.render(<Demo />, document.getElementById("root"));
`;
        entries[c.name] = PATHS.resolveCodebox(`Entrys/${c.name}.tsx`);
        fs.writeFileSync(entries[c.name], entryCode);
        return new HtmlWebpackPlugin({
            filename: `${c.name}.html`,
            template: PATHS.resolveCodebox("Assets/index.html"),
            inject: true,
            title: c.title
        });
    });

    console.log("\n\n");
    return { entries, htmlWebpackPlugins };
}
