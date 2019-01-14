const Router = require("koa-router");
const router = new Router({prefix: "/api"});

router.get("/share", ctx => {
  const url = `${ctx.protocol}://${ctx.host}/#${ctx.path}?${ctx.querystring}`;
  ctx.redirect(url);
})

module.exports = router;
