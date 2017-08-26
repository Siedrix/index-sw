const {Post, Url} = require('models')

module.exports = {
  method: 'post',
  path: '/',
  handler: async function (ctx) {
    if (!ctx.state.user) { ctx.throw(403) }

    const { urlString, description } = ctx.request.body

    var url = await Url.findOne({url: urlString})
    if (!url) {
      url = await Url.create({url: urlString})
    }

    const post = new Post({
      url: url._id,
      description
    })

    await post.save()

    ctx.body = post.toJSON()
  }
}
