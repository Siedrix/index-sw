const {Post} = require('models')

module.exports = {
  method: 'get',
  path: '/:uuid',
  handler: async function (ctx) {
    const post = await Post.findOne({
      uuid: ctx.params.uuid,
      deleted: {$ne: true}
    })
    .populate('url')
    .populate('tags')
    .populate('user')

    if (!post) {
      return ctx.throw(404)
    }

    ctx.body = post.format()
  }
}
