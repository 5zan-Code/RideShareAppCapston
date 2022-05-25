const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_like_schema = new schema(
    {
        postId: ObjectId,
        userId: ObjectId
    }
)

module.exports = mongoose.model('post_like', post_like_schema)
