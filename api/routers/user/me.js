module.exports = {
  method: 'get',
  path: '/me',
  handler: async function (ctx) {
    if (ctx.state.user) {
      ctx.body = {
        loggedIn: true,
        user: await ctx.state.user.toPublic()
      }
    } else {
      ctx.body = {
        loggedIn: false
      }
    }
  }
}
