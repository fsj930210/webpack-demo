const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const friendlyFormatter = require("eslint-friendly-formatter");
const isProd = process.env.NODE_ENV === "production";
const rules = [{
  test: /\.css$/,
  use: [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    "postcss-loader"
  ]
}, {
  // 编译scss
  test: /\.scss$/,
  use: [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    "postcss-loader",
    {
      loader: "sass-loader",
      options: isProd ? {} : { sourceMap: "inline" }
    }
  ],
  exclude: /node_modules/
}, { // To be safe, you can use enforce: "pre" section to check source files, not modified by other loaders (like babel-loader)
  enforce: "pre",
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "eslint-loader",
  options: {
    formatter: friendlyFormatter
  }
},
{
  test: /\.js$/,
  use: ["babel-loader"],
  exclude: "/node_modules/"
}, {
  test: /\.(png|jpg|gif)$/,
  use: [{
    loader: "url-loader",
    options: {
      limit: 5 * 1024, // 小于这个时将会已base64位图片打包处理
      outputPath: "images"
    }
  }]
},
{
  test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
  loader: "url-loader",
  options: {
    limit: 10000
  }
},
{
  test: /\.html$/,
  use: ["html-withimg-loader", "ejs-loader"] // html中的img标签
}];
module.exports = rules;
