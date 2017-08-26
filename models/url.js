const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const urlSchema = new Schema({
  created_at: { type: Date, default: Date.now },
  url: String,
  content: String,
  images: [Schema.Types.Mixed],
  diffbotUri: String,
  title: String,
  text: String,
  html: String,
  date: Date,
  siteName: String,
  icon: String
})

module.exports = mongoose.model('Url', urlSchema)
