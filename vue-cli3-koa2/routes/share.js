const Router = require("koa-router");
const router = new Router({ prefix: '/share' });

router.get("*", ctx => {
  const query = ctx.querystring
  const url = `${ctx.protocol}://${ctx.host}${ctx.path}${query ? `?${ctx.querystring}`: ''}`;
  ctx.redirect(url);
})

module.exports = router;
