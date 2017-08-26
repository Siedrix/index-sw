const Diffbot = require('diffbot').Diffbot
const config = require('config')

const mocks = require('./mocks')
const diffbot = new Diffbot(config.diffbot)

const fetch = function (url) {
  return new Promise(function (resolve, reject) {
    diffbot.article({uri: url}, function(err, response) {
      if (err) { return reject(err) }

      resolve(response)
    })
  })
}

module.exports = async function (uri) {
  if (config.env === 'test') {
    return mocks[uri]
  }

  const body = await fetch(uri)

  if (!body.objects) { return }
  return body.objects[0]
}
