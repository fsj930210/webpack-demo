// =================== 用webpack-dev-middleware的配置======================
// const path = require("path");
// const webpack = require("webpack");
// const merge = require("webpack-merge");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const baseWebpackConfig = require("./webpack.base.conf");
// const webpackConfigDev = {
//   mode: "development", // 通过 mode 声明开发环境
//   output: {
//     path: path.resolve(process.cwd(), "dist/pages"),
//     // 打包多出口文件
//     filename: "js/[name].bundle.js",
//     publicPath: "/"
//   },
//   plugins: [
//     // 热更新
//     new webpack.HotModuleReplacementPlugin()
//   ],
//   devtool: "source-map" // 开启调试模式
// };
// module.exports = merge(baseWebpackConfig, webpackConfigDev);

// =================== 用devServer代理本地api, 需要启动两个服务======================

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf");
const webpackConfigDev = {
  mode: "development", // 通过 mode 声明开发环境
  output: {
    path: path.resolve(process.cwd(), "dist/pages"),
    // 打包多出口文件
    filename: "./js/[name].bundle.js"
  },
  devServer: {
    // contentBase: [path.join(process.cwd(), "multi-pages")],
    publicPath: "/pages/",
    host: "0.0.0.0",
    port: "6700",
    watchContentBase: true,
    overlay: true, // 浏览器页面上显示错误
    //open: true, // 开启浏览器
    // stats: "errors-only", //stats: "errors-only"表示只打印错误：
    hot: true, // 开启热更新
    hotOnly: true,
    // 服务器代理配置项
    proxy: {
      "/api": "http://localhost:6600"
    }
  },
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(process.cwd(), "public"),
        to: "public",
        ignore: [".*"]
      }
    ])
  ],
  devtool: "source-map" // 开启调试模式
};
module.exports = merge(baseWebpackConfig, webpackConfigDev);
