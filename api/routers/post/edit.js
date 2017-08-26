const {Post, Tag} = require('models')
const _a = require('lodash-addons')

module.exports = {
  method: 'put',
  path: '/:uuid',
  handler: async function (ctx) {
    if (!ctx.state.user) { ctx.throw(403) }

    const post = await Post.findOne({uuid: ctx.params.uuid})
    const user = ctx.state.user
    const body = ctx.request.body

    if (!post) {
      return ctx.throw(404)
    }

    if (!post.user.equals(user._id)) {
      return ctx.throw(403)
    }

    const tags = body.tags || []
    post.tags = []

    for (const tagName of tags) {
      const slug = _a.slugify(tagName)
      var tag = await Tag.findOne({slug: slug})

      if (!tag) {
        tag = await Tag.create({slug, name: tagName})
      }

      post.tags.push(tag._id)
    }

    post.description = body.description
    await post.save()

    ctx.body = {success: true}
  }
}
