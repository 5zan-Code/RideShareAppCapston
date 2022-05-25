const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const schema = mongoose.Schema

const user_comment = new schema(
    {
        postId: ObjectId,
        userId: ObjectId,
        comment_text: String
    }
)

module.exports = mongoose.model('user_comment',user_comment)


