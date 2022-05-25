const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const schema = mongoose.Schema

const upload_post_schema = new schema(
    {
        uid: ObjectId,
        description: String,
        post_image: {
            data: Buffer,
            contentType: String
        },
        user_name: String,
        lat: Number,
        log: Number,
        shopId: Number
    }
)

module.exports = mongoose.model('user_post', upload_post_schema)