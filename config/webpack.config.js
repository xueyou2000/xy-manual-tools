const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const PATHS = require("./path");
const tools = require("../tools");
const fs = require("fs-extra");

tools.createLoadExamplesEntry();
const tsconfig = tools.updateTsconfig();

module.exports = () => {
    const packageJson = tools.getPackageConfig();
    const summarys = tools.getManualSummary();
    const assetsExist = fs.existsSync(PATHS.resolveProject("./src/assets/index.js"));

    let entry = {};
    if (assetsExist) {
        entry.assete = PATHS.resolveProject("./src/assets/index.js");
    }
    entry.demo = PATHS.resolveCodebox("main.tsx");

    return {
        mode: "production",
        devtool: "none",
        context: PATHS.projectDirectory,
        entry,
        output: {
            path: PATHS.resolveProject("demo"),
            filename: "js/[name].js",
            chunkFilename: "js/[name].chunk.js",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            alias: {
                [`${packageJson.name}$`]: PATHS.resolveProject("./src/index.tsx"),
                [`${packageJson.name}/assets/index`]: PATHS.resolveProject("./src/assets/index.js"),
            },
        },
        externals: {
            react: "React",
            "react-dom": "ReactDOM",
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
                            configFileName: tsconfig,
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, require.resolve("css-loader")],
                },
                {
                    test: /\.scss$/,
                    include: [PATHS.resolveProject("src"), PATHS.resolveProject("examples"), PATHS.codeboxDirectory],
                    use: [MiniCssExtractPlugin.loader, require.resolve("css-loader"), require.resolve("sass-loader")],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loaders: require.resolve("file-loader"),
                    options: {
                        limit: 100,
                        name: "images/[name].[hash:7].[ext]",
                    },
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: require.resolve("file-loader"),
                    options: {
                        limit: 100,
                        name: "media/[name].[hash:7].[ext]",
                    },
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: require.resolve("file-loader"),
                    options: {
                        limit: 100,
                        name: "fonts/[name].[hash:7].[ext]",
                    },
                },
            ],
        },
        optimization: {
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    components: {
                        test: /(xy-(\w+)|utils-)/,
                        name: "components",
                        chunks: "all",
                        enforce: true,
                        priority: 1,
                    },
                    bundle: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "bundle",
                        chunks: "initial",
                        priority: -10,
                    },
                },
            },
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.componentName": JSON.stringify(packageJson.name),
                "process.env.SummaryStart": JSON.stringify(summarys[0]),
                "process.env.SummaryHeader": JSON.stringify(summarys[1]),
                "process.env.SummaryAPI": JSON.stringify(summarys[2]),
                "process.env.SummaryFooter": JSON.stringify(summarys[3]),
            }),
            new CleanWebpackPlugin(),
            new CaseSensitivePathsPlugin(),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: PATHS.resolveCodebox("Assets/index.html"),
                inject: true,
                title: packageJson.name,
                env: "production",
            }),
            new ManifestPlugin(),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new OptimizeCSSAssetsPlugin(),
            new CopyWebpackPlugin([{ from: "**/*", context: path.resolve(__dirname, "../static"), to: "static" }]),
            new MiniCssExtractPlugin({ filename: "css/[name].[hash].css" }),
            // new BundleAnalyzerPlugin()
        ],
    };
};
