const env = require('./env')
const isTest = env === 'test'

const mongo = {
  db: isTest ? 'marble-seeds-test' : process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT
}

mongo.url = `mongodb://${mongo.host}:${mongo.port}/${mongo.db}`

module.exports = {
  mongo
}
