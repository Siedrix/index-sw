const {Post, Url, Tag, Like} = require('models')
const _a = require('lodash-addons')

module.exports = {
  method: 'post',
  path: '/',
  handler: async function (ctx) {
    if (!ctx.state.user) { ctx.throw(403) }

    const user = ctx.state.user
    const post = ctx.request.body.post

    const like = new Like({
      post: post._id,
      user: user._id
    })

    await like.save()

    ctx.body = {
      uuid: like.uuid
    }
  }
}
