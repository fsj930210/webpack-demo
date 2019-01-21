const path = require("path");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const historyApi = require("koa2-history-api");
const serve = require("koa-static");
const mount = require("koa-mount");
const logger = require('koa-logger');
const ip = require("ip").address();
// const Router = require("koa-router");
const resoponseMiddleware = require("./middlewares/response");
const apiRouter = require("./routes");

// const router = new Router();
const app = new Koa();
const isProd = process.env.NODE_ENV === "production";
// const isAppdev = process.env.DEV_ENV === "app";
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
  app.use(serve(resolve("./dist/app"))); // 真实环境请用nginx
  app.use(mount("/pages", serve(resolve("./dist/pages")))); // 真实环境请用nginx
} else {
  // app.use(mount("/pages", serve(resolve("./dist/pages"))));
  const webpack = require("webpack");
  const { devMiddleware, hotMiddleware } = require("koa-webpack-middleware");
  // const webpackConfig = isAppdev ? require("./build/app/webpack.dev.conf") : require("./build/pages/webpack.dev.conf");
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
  
  // ==================== 使用node来跑多页应用 ======================
  // if (!isAppdev) {
  //   compiler.hooks.done.tap("html-webpack-plugin", () => {
  //     router.get("/pages/*.html", ctx => {
  //       ctx.redirect(`/${ctx.params[0]}.html`);
  //     });
  //     router.get("/*.html", ctx => {
  //       let result;
  //       const fs = webpackDevMiddleware.fileSystem;
  //       const readFile = file => fs.readFileSync(path.join(webpackConfig.output.path, file), 'utf-8')
  //       try {
  //         result = readFile(`/${ctx.params[0]}.html`);
  //       } catch (err) {
  //         result = err.toString();
  //       }
  //       ctx.type = "html";
  //       ctx.body = result;
  //     });
  //   });
  // }
  // app.use(router.routes()).use(router.allowedMethods());

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
