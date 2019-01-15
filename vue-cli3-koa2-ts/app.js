const path = require("path");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const historyApi = require("koa2-history-api");
const serve = require("koa-static");
const mount = require("koa-mount");
const ip = require("ip").address();
const resoponseMiddleware = require("./middlewares/response");
const router = require("./routes");

const app = new Koa();
const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3496;
const uri = `http://${ip}:${port}`;

app.use(historyApi({ whiteList: ["/api", "/public", "/pages"] }));
// app.use(serve(path.join(__dirname, "./dist")));
// app.use(mount("/public", serve(path.join(__dirname, "./public"))));
// app.use(mount("/app", serve(path.join(__dirname, "./dist/app"))));
// app.use(mount("/pages", serve(path.join(__dirname, "./dist/pages"))));
app.use(bodyParser());
app.use(resoponseMiddleware);
app.use(
  cors({
    allowMethods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
    allowHeaders: [
      "Origin",
      "Content-Type",
      "Authorization",
      "Accept",
      "Cookie",
      "User-Agent",
      "X-Requested-With",
      "Connection"
    ]
  })
);
app.use(router.routes()).use(router.allowedMethods());

if (!isProd) {
  const webpack = require("webpack");
  const webpackConfig = require("@vue/cli-service/webpack.config.js");
  const { devMiddleware, hotMiddleware } = require("koa-webpack-middleware");
  webpackConfig.entry.app.unshift('webpack-hot-middleware/client');
  const compiler = webpack(webpackConfig);
  const webpackHotMiddlewrare = hotMiddleware(compiler);
  const webpackDevMiddleware = devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    stats: {
      colors: true,
      modules: false
    },
    noInfo: false
  });
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlewrare);
  webpackDevMiddleware.waitUntilValid(() => {
    console.log("yeah! you can start it!");
  });
}

app.on("error", (err, ctx) => {
  console.error("server error", err);
  if (err.status === 404) {
    ctx.body = "404 | Page Not Found!";
  } else {
    const status = err.status || 500;
    ctx.body = `${status} | Internal server error`;
  }
});

app.listen(port, () => {
  console.info(`server is running at http://${ip}:${port}`);
});
