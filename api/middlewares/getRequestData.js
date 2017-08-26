const { User } = require('models')
const { server } = require('config')
const jwt = require('lib/jwt')

module.exports = async function (ctx, next) {
  if (ctx.req.headers.authorization) {
    const [ method, token ] = ctx.req.headers.authorization.split(' ')

    if (method === 'Bearer') {
      var data
      try {
        data = await jwt.verify(token)
      } catch (e) {
        ctx.throw(401, 'Invalid JWT')
      }

      let user = await User.findOne({
        uuid: data.uuid,
        apiToken: data.apiToken
      })

      if (!user) {
        ctx.throw(401, 'Invalid User')
      }

      ctx.state.user = user
    }
  }

  ctx.state.appHost = server.appHost
  ctx.state.apiHost = server.apiHost

  await next()
}
