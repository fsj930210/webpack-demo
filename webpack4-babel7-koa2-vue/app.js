const path = require("path");
const fs = require("fs")
const Koa = require("koa");
const Router = require("koa-router");
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
const router = new Router();
const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 6200;
const resolve = file => path.resolve(__dirname, file)

let source
let readyPromise
let devMiddleware
if (isProd) {
  source = fs.readFileSync(resolve('./dist/index.html'), 'utf-8')
} else {
  ({readyPromise, devMiddleware} = require('./build/dev-server.js')(app, ({ template }) => {
    source = template
  }))
}
// 首页渲染方法
const render = (ctx) => {
  ctx.type = "html";
  ctx.body = source;
}

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


router.get("/", async (ctx ,next) => {
  isProd ? render(ctx) : readyPromise.then(() => render(ctx))
})

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.use(historyApi({ whiteList: ["/api"] }));

if (isProd) {
  app.use(serve(resolve('./dist')));
} else {
  app.use(devMiddleware)
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
