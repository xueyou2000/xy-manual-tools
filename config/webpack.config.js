const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const PATHS = require("./path");
const tools = require("./tools");

module.exports = () => {
    const packageJson = tools.getPackageConfig();

    return {
        mode: "production",
        devtool: "none",
        context: PATHS.projectDirectory,
        entry: PATHS.resolveCodebox("main.tsx"),
        output: {
            path: PATHS.resolveProject("demo"),
            filename: "js/[name].js",
            chunkFilename: "js/[name].chunk.js"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            alias: {
                [`${packageJson.name}`]: "./src/index.tsx"
            }
        },
        externals: {
            react: "React",
            "react-dom": "ReactDOM"
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    include: [PATHS.resolveProject("src"), PATHS.resolveProject("examples"), PATHS.codeboxDirectory],
                    use: {
                        loader: require.resolve("awesome-typescript-loader"),
                        options: {
                            useCache: true
                        }
                    }
                },
                {
                    test: /\.css$/,
                    loaders: [MiniCssExtractPlugin.loader, require.resolve("style-loader"), require.resolve("css-loader")]
                },
                {
                    test: /\.scss$/,
                    loaders: [MiniCssExtractPlugin.loader, require.resolve("sass-loader")]
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
            new CleanWebpackPlugin(),
            new CaseSensitivePathsPlugin(),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: PATHS.resolveCodebox("index.html"),
                inject: true,
                title: packageJson.name
            }),
            new ManifestPlugin(),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new OptimizeCSSAssetsPlugin(),
            new CopyWebpackPlugin(["../codeBox/static/**/*"]),
            new MiniCssExtractPlugin({ filename: "css/[name].css" })
        ]
    };
};
