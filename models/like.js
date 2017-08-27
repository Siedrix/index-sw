const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4 } = require('uuid')

const dataTables = require('mongoose-datatables')

const likeSchema = new Schema({
	uuid: {type: String, default: v4},
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	post: {type: Schema.Types.ObjectId, ref: 'Post'},
	createdAt: {type: Date, default: Date.now}
})

likeSchema.plugin(dataTables)

module.exports = mongoose.model('Like', likeSchema)
