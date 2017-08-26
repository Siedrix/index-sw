const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4 } = require('uuid')

const dataTables = require('mongoose-datatables')

const postSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  url: { type: Schema.Types.ObjectId, ref: 'Url' },
  description: String,
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  uuid: { type: String, default: v4 }
})

postSchema.methods.format = function () {
  const data = {
    description: this.description,
    uuid: this.uuid,
    createdAt: this.createdAt
  }

  if (this.url) {
    data.content = this.url.content
    data.title = this.url.title
    data.text = this.url.text
    data.html = this.url.html
    data.publishData = this.url.date
    data.siteName = this.url.siteName
    data.siteIcon = this.url.icon
    data.href = this.url.pageUrl
  }

  return data
}

postSchema.plugin(dataTables)

module.exports = mongoose.model('Post', postSchema)
