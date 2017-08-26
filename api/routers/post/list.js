const {Post, Url, User} = require('models')

module.exports = {
  method: 'get',
  path: '/',
  handler: async function (ctx) {
    const query = {}
    if (ctx.request.query.user) {
      const user = await User.find({screenName: ctx.request.query.user.toLowerCase()})
      query.user = user._id
    }

    var posts = await Post.dataTables({
      limit: ctx.request.query.limit || 20,
      skip: ctx.request.query.start,
      find: query,
      populate: 'url'
    })

    posts.data = posts.data.map(p => p.format())

    ctx.body = posts
  }
}
