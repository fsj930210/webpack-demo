const path = require("path");
const merge = require("webpack-merge");
// 清除目录等
const CleanWebpackPlugin = require("clean-webpack-plugin");

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackConfigBase = require("./webpack.base.conf");

const webpackConfigProd = {
  mode: "production", // 通过 mode 声明生产环境
  output: {
    path: path.resolve(process.cwd(), "dist/pages"),
    // 打包多出口文件
    filename: "js/[name].[hash].js",
    publicPath: "./"
  },
  plugins: [
    new CleanWebpackPlugin(["dist/pages/**/*"], {
      root: process.cwd(), // 根目录
      verbose: true, // 开启在控制台输出信息
      // dry Use boolean "true" to test/emulate delete. (will not remove files).
      // Default: false - remove files
      dry: false
    }),
    // 分离css插件参数为提取出去的路径
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].min.css"
    }),
    // 压缩css
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // 上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: false,
          drop_console: true
        }
      }
    })
  ]
};

module.exports = merge(webpackConfigBase, webpackConfigProd);
