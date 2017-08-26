const _ = require('lodash')
const {User, Post} = require('models')

module.exports = {
  method: 'get',
  path: '/:username',
  handler: async function (ctx) {
    const user = await User.findOne({screenName: ctx.params.username})

    if (!user) { ctx.throw(404) }

    const posts = await Post.find({
      user: user._id
    }).select('tags').populate('tags')

    const data = user.toPublic()
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

    data.tags = _.chain(tags)
      .values()
      .sortBy(t => t.count * -1)
      .value()

    ctx.body = data
  }
}
