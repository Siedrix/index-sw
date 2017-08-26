module.exports = async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500

    console.error('=>', err)
  }
}
