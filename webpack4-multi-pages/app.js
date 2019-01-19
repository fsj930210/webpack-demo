const path = require("path");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const historyApi = require("koa2-history-api");
const serve = require("koa-static");
const mount = require("koa-mount");
const logger = require('koa-logger');
const ip = require("ip").address();
const resoponseMiddleware = require("./middlewares/response");
const apiRouter = require("./routes");

const app = new Koa();
const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 6600;
const resolve = file => path.resolve(__dirname, file);

app.use(logger());
app.use(bodyParser());
app.use(resoponseMiddleware);
app.use(
  cors({
    allowMethods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
    allowHeaders: ["Origin", "Content-Type", "Authorization", "Accept", "Cookie", "User-Agent", "X-Requested-With", "Connection"]
  })
);

app.use(mount("/public", serve(resolve("./public"))));

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.use(historyApi({ whiteList: ["/api", "/pages"] }));

if (isProd) {
  app.use(serve(resolve("./dist/app")));
  app.use(mount("/pages", serve(resolve("./dist/pages"))));
} else {
  const webpack = require("webpack");
  const { devMiddleware, hotMiddleware } = require("koa-webpack-middleware");
  const webpackConfig = require("./build/app/webpack.dev.conf");
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
