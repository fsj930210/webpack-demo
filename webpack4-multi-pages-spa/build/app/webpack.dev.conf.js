"use strict";
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssTextPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const utils = require("./utils");
const config = require("../config");
const baseWebpackConfig = require("./webpack.base.conf");

function resolve (dir) {
  return path.join(__dirname, "../../", dir);
}
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true"
  ].concat(baseWebpackConfig.entry[name]);
});

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  module: {
    rules: utils.styleLoaders({ 
      hotReload: true, 
      extract: true, 
      sourceMap: config.dev.cssSourceMap, 
      usePostCSS: true 
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssTextPlugin({
      filename: utils.assetsPath("[name].css")
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve("app/index.html"),
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
});

module.exports = devWebpackConfig;
