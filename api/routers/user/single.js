const {User} = require('models')

module.exports = {
  method: 'get',
  path: '/:username',
  handler: async function (ctx) {
    const user = await User.findOne({screenName: ctx.params.username})

    if (!user) { ctx.throw(404) }

    ctx.body = user.toPublic()
  }
}
