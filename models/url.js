const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const urlSchema = new Schema({
  created_at : { type : Date, default: Date.now  },
  url        : String,
  content    : String,
  images     : [String]
})

module.exports = mongoose.model('Url', urlSchema)
