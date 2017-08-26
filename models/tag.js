const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const tagSchema = new Schema({
  created_at : { type : Date, default: Date.now  },
  slug       : String
})

module.exports = mongoose.model('Tag', tagSchema)
