const {Post} = require('models')

module.exports = {
  method: 'del',
  path: '/:uuid',
  handler: async function (ctx) {
    if (!ctx.state.user) { ctx.throw(403) }

    const post = await Post.findOne({uuid: ctx.params.uuid})
    const user = ctx.state.user

    if (!post) {
      return ctx.throw(404)
    }

    if (!post.user.equals(user._id)) {
      return ctx.throw(403)
    }

    post.deleted = true
    await post.save()

    ctx.body = {success: true}
  }
}
