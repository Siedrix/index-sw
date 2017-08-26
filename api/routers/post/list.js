const config = require('config')

const {Post, Url, User} = require('models')


module.exports = {
  method: 'get',
  path: '/:user',
  handler: async function (ctx) {
    // Get all the post listed from this user

    var user  = await User.find({screenName : ctx.params.user.toLowerCase()})
    var posts = await Post.find({user : user}) //Sacamos el twitter user

    ctx.body = {
      user: user,
      posts: posts
    }
  }
}
