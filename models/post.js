const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const postSchema = new Schema({
  created_at : { type : Date, default: Date.now  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  url :{ type: Schema.Types.ObjectId, ref: 'Url' },
  description : String,
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
})

module.exports = mongoose.model('Post', postSchema)
