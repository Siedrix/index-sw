const config = require('config')

const {Post, Url, User} = require('models')


module.exports = {
  method: 'get',
  path: '/:uuid',
  handler: async function (ctx) {
    var post = await Post.findOne({uuid : ctx.params.uuid}) //Sacamos el twitter user
    ctx.body = post
  }
}
