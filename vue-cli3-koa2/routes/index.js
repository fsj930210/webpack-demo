const Router = require("koa-router");
const router = new Router();
const share = require("./share");
const user = require("./user");

router.use("/api", share.routes(), share.allowedMethods())
router.use("/api", user.routes(), user.allowedMethods())

module.exports = router;
