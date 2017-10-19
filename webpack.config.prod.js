const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "app.css",
  allChunks: true
});

module.exports = {
    entry: "./src",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "prod")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$|\.scss$/,
                use: extractSass.extract({
                  fallback: "style-loader",
                  use: [
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
                        plugins: loader => [
                          // require('postcss-import')({ root: loader.resourcePath }), //import into css like in sass
                          require("autoprefixer")()
                        ]
                      }
                    },
                    {
                      loader: "sass-loader",
                      options: {
                        sourceMap: true,
                        includePaths: [path.resolve(__dirname, "dist/src/sass")]
                      }
                    }
                  ]
                })
            }
        ]
    },
    plugins: [
        extractSass,
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: true,
            compress: true,
            comments: false
        })
    ]
}