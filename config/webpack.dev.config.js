const path = require("path");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const PATHS = require("./path");
const tools = require("../tools");

tools.createLoadExamplesEntry();
const tsconfig = tools.updateTsconfig();

module.exports = () => {
    const packageJson = tools.getPackageConfig();
    const summarys = tools.getManualSummary();
    const assetsExist = fs.existsSync(PATHS.resolveProject("./src/assets/index.js"));
    let entry = [PATHS.resolveCodebox("main.tsx")];
    if (assetsExist) {
        entry.push(PATHS.resolveProject("./src/assets/index.js"));
    }

    return {
        mode: "development",
        devtool: "eval-source-map",
        context: PATHS.projectDirectory,
        entry: entry,
        output: {
            path: path.resolve(__dirname, "../dist"),
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
        devServer: {
            port: process.env.prot || 8080,
            hot: true,
            inline: true,
            open: true,
            quiet: true,
            overlay: true
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
        plugins: [
            new webpack.DefinePlugin({
                "process.env.componentName": JSON.stringify(packageJson.name),
                "process.env.SummaryStart": JSON.stringify(summarys[0]),
                "process.env.SummaryHeader": JSON.stringify(summarys[1]),
                "process.env.SummaryAPI": JSON.stringify(summarys[2]),
                "process.env.SummaryFooter": JSON.stringify(summarys[3])
            }),
            new CleanWebpackPlugin(),
            new CaseSensitivePathsPlugin(),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: PATHS.resolveCodebox("Assets/index.html"),
                inject: true,
                title: packageJson.name
            }),
            new webpack.HashedModuleIdsPlugin(),
            new FriendlyErrorsWebpackPlugin()
        ]
    };
};
