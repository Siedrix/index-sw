const {Tag} = require('models')

module.exports = {
  method: 'get',
  path: '/',
  handler: async function (ctx) {
    const query = {}

    var tags = await Tag.dataTables({
      limit: ctx.request.query.limit || 20,
      skip: ctx.request.query.start,
      find: query
    })

    ctx.body = tags
  }
}
