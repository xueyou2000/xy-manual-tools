const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PATHS = require("./path");
const tools = require("../tools");
const fs = require("fs-extra");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

tools.createMenus();
const tsconfig = tools.updateTsconfig();

module.exports = () => {
    const packageJson = tools.getPackageConfig();
    const assetsExist = fs.existsSync(PATHS.resolveProject("./src/assets/index.js"));
    let entry = { router: PATHS.resolveCodebox("router.tsx") };
    if (assetsExist) {
        entry["assets"] = PATHS.resolveProject("./src/assets/index.js");
    }

    console.log("由于demo带路由, 所以编译后需要用静态服务器打开!");

    return {
        mode: "production",
        devtool: "none",
        context: PATHS.projectDirectory,
        entry: entry,
        output: {
            path: PATHS.resolveProject("demo"),
            filename: "js/[name].js",
            chunkFilename: "js/[name].chunk.js",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
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
                    loaders: [require.resolve("style-loader"), require.resolve("css-loader")],
                },
                {
                    test: /\.scss$/,
                    include: [PATHS.resolveProject("src"), PATHS.resolveProject("examples"), PATHS.codeboxDirectory],
                    loaders: [require.resolve("style-loader"), require.resolve("css-loader"), require.resolve("sass-loader")],
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
                        test: /xy-(\w+)/,
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
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin([{ from: "**/*", context: path.resolve(__dirname, "../static"), to: "static" }]),
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
            new MiniCssExtractPlugin({ filename: "css/[name].[hash].css" }),
        ],
    };
};
