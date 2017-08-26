require('../config')
require('lib/databases/mongo')

const { appPort } = require('config/server')
const app = require('./')

app.listen(appPort)
console.log(`App started on port ${appPort}`)
