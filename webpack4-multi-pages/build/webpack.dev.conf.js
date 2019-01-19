const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
console.log()
const webpackConfigDev = {
  mode: "development", // 通过 mode 声明开发环境
  output: {
    path: path.resolve(process.cwd(), "dist"),
    // 打包多出口文件
    filename: "./js/[name].bundle.js"
  },
  devServer: {
    contentBase: [path.join(process.cwd(), "src")],
    publicPath: "/",
    host: "0.0.0.0",
    port: "9100",
    overlay: true, // 浏览器页面上显示错误
    open: true, // 开启浏览器
    // stats: "errors-only", //stats: "errors-only"表示只打印错误：
    hot: true, // 开启热更新
    // 服务器代理配置项
    proxy: {
      "/test/*": {
        target: "https://www.baidu.com",
        secure: true,
        changeOrigin: true
      }
    }
  },
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "source-map" // 开启调试模式
};
module.exports = merge(baseWebpackConfig, webpackConfigDev);
