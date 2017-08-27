const _ = require('lodash')

const {Post} = require('models')

module.exports = {
  method: 'get',
  path: '/',
  handler: async function (ctx) {
    const posts = await Post.find().select('tags').populate('tags')

    const tags = {}
    posts.forEach(post => {
      post.tags.forEach(tag => {
        if (!tags[tag.slug]) {
          tags[tag.slug] = {}
          tags[tag.slug].name = tag.name
          tags[tag.slug].slug = tag.slug
          tags[tag.slug].count = 0
        }

        tags[tag.slug].count++
      })
    })

    ctx.body = _.chain(tags)
      .values()
      .sortBy(t => t.count * -1)
      .value()
  }
}
