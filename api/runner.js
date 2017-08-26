require('../config')
require('lib/databases/mongo')

const { apiPort } = require('config/server')
const app = require('./')

app.listen(apiPort)
console.log(`Api started on port ${apiPort}`)
