const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4 } = require('uuid')

const postSchema = new Schema({
  created_at: {type: Date, default: Date.now},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  url: { type: Schema.Types.ObjectId, ref: 'Url' },
  description: String,
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  uuid: { type: String, default: v4 }
})

module.exports = mongoose.model('Post', postSchema)
