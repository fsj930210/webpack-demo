const Router = require("koa-router");
const router = new Router({ prefix: '/user' });

router.get("/:id", ctx => {
  ctx.success({data: {id: ctx.params.id, name: "测试"}})
})

module.exports = router;
