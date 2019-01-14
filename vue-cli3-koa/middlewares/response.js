module.exports = async (ctx, next) => {
  ctx.error = ({ code = 400, message = 'Internal server error', data = [], status = 400}) => {
    ctx.status = status
    ctx.body = { code, message, data }
  }
  ctx.success = ({ data = [], message = 'success' }) => {
    ctx.status = 200
    ctx.body = { code: 0, message, data }
  }
  await next()
}
