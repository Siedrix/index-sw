const {Post, Tag, User} = require('models')

module.exports = {
  method: 'get',
  path: '/',
  handler: async function (ctx) {
    const query = {}
    if (ctx.request.query.user) {
      const user = await User.findOne({screenName: ctx.request.query.user.toLowerCase()})
      query.user = user._id
    }

    if (ctx.request.query.tag) {
      const tag = await Tag.findOne({slug: ctx.request.query.tag.toLowerCase()})
      query.tags = tag._id
    }

    var posts = await Post.dataTables({
      limit: ctx.request.query.limit || 20,
      skip: ctx.request.query.start,
      find: query,
      populate: 'url tags'
    })

    posts.data = posts.data.map(p => p.format())

    ctx.body = posts
  }
}
