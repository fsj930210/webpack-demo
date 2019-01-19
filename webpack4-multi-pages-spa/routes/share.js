const Router = require("koa-router");
const router = new Router({ prefix: "/share" });

router.get("*", ctx => {
  const query = ctx.querystring
  const realPath = ctx.path.replace("/api/share", "");
  const url = `${ctx.protocol}://${ctx.host}${realPath}${query ? `?${ctx.querystring}`: ""}`;
  ctx.redirect(url);
})

module.exports = router;
