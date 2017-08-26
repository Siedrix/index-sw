const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const dataTables = require('mongoose-datatables')

const tagSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  slug: {type: String, lowercase: true, trim: true, unique: true},
  name: {type: String, lowercase: true, trim: true}
})

tagSchema.plugin(dataTables)

module.exports = mongoose.model('Tag', tagSchema)
