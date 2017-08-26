const {Post, Url} = require('models')
const diffbot = require('lib/diffbot')

module.exports = {
  method: 'post',
  path: '/',
  handler: async function (ctx) {
    if (!ctx.state.user) { ctx.throw(403) }

    const urlString = ctx.request.body.url
    const description = ctx.request.body.description

    if (!urlString) { ctx.throw(422, 'Url is required') }
    const data = await diffbot(urlString)

    var url = await Url.findOne({diffbotUri: data.diffbotUri})
    if (!url) {
      url = await Url.create(data)
    }

    const post = new Post({
      url: url._id,
      description
    })

    await post.save()

    ctx.body = post.toJSON()
  }
}
