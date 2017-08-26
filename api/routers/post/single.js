const {Post} = require('models')

module.exports = {
  method: 'get',
  path: '/:uuid',
  handler: async function (ctx) {
    var post = await Post.findOne({uuid: ctx.params.uuid}).populate('url')

    ctx.body = post.format()
  }
}
