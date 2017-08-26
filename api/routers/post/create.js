const {Post, Url, Tag} = require('models')
const diffbot = require('lib/diffbot')
const _a = require('lodash-addons')

module.exports = {
  method: 'post',
  path: '/',
  handler: async function (ctx) {
    if (!ctx.state.user) { ctx.throw(403) }

    const urlString = ctx.request.body.url
    const description = ctx.request.body.description
    const tags = ctx.request.body.tags || []

    if (!urlString) { ctx.throw(422, 'Url is required') }
    const data = await diffbot(urlString)

    var url = await Url.findOne({diffbotUri: data.diffbotUri})
    if (!url) {
      url = await Url.create(data)
    }

    const post = new Post({
      url: url._id,
      description,
      user: ctx.state.user._id
    })

    for (const tagName of tags) {
      const slug = _a.slugify(tagName)
      var tag = await Tag.findOne({slug: slug})

      if (!tag) {
        tag = await Tag.create({slug, name: tagName})
      }

      post.tags.push(tag._id)
    }

    await post.save()

    ctx.body = {
      uuid: post.uuid
    }
  }
}
