const mongoose = require('mongoose')
const schema = mongoose.Schema

const all_post_schema = new schema(
    {
        uid: String,
        user_image: {
            data: Buffer,
            contentType: String
        },
        description: String,
        post_image: {
            data: Buffer,
            contentType: String
        },
        user_name: String,
        lat: Number,
        log: Number,
        shopId: Number,
        isLiked: Boolean,
        likeCount: Number,
        commentCount: Number,
    }
)

module.exports = mongoose.model('user_post', all_post_schema)