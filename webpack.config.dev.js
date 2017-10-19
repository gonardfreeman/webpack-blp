const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8081,
        hot: true,
        inline: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/$/,
                    to: "/views/index.html"
                }
            ]
        }
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "eslint-loader",
                options: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.css$|\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            minimize: true || {
                                preset: [
                                    "default",
                                    {
                                        discardComments: {
                                            removeAll: true
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: "./postcss.config.js"
                            },
                            sourceMap: true,
                            plugins: loader => [require("autoprefixer")]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            includePaths: [path.resolve(__dirname, "src/sass")]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}