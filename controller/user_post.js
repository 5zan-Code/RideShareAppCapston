const express = require('express')
const route = express.Router()
const mdb_user_post = require('../model/upload_post_model')
//const mdb_get_all_post = require('../model/all_post_mode')
const upload = require('./file_upload')
var path = require('path')
var fs = require('fs')
var response = { id: 0, msg: "", statusCode: 0, data: [] }

route.post('/upload_post', upload.single('post_image'), async (req, res) => {
    try {
        let postData = mdb_user_post()
        postData.uid = req.body.uid
        postData.description = req.body.description
        postData.user_name = req.body.user_name
        postData.lat = req.body.lat
        postData.log = req.body.log
        postData.shopId = req.body.shopId
        postData.post_image = {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
        let newPostData = await postData.save()
        response.id = newPostData.id
        response.msg = "Post Uploaded Successfully."
        response.statusCode = 202

    } catch (e) {
        response.statusCode = 404
        response.msg = e
    }
    res.json(response)
})

route.post('/get_all_post', async (req, res) => {
    try {
        let allPost = new mdb_user_post()
        let isLiked = await allPost.collection.aggregate([
            { $match: {  } },
            {
                $lookup: {
                    from: 'post_likes',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'likes'
                }
            },
            {
                $lookup: {
                    from: 'user_comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comment'
                }
            },

            {
                $lookup: {
                    from: 'user_registrations',
                    localField: 'uid',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    likeCount: { $sum: { $size: '$likes' } },
                    commentCount: { $sum: { $size: '$comment' } },
                    description: { $first: '$description' },
                    uid: { $first: '$uid' },
                    user_image: { $first: '$user.user_image' },
                    post_image: { $first: '$post_image' },
                    user_name: { $first: '$user_name' },
                    lat: { $first: '$lat' },
                    log: { $first: '$log' },
                }
            },
        ])
            .toArray(function (err, result) {
                response.data = result
                response.statusCode = 200
                response.msg = "all post"
                res.json(response)

            })
    } catch (e) {
        response.statusCode = 404
        response.msg = e
    }
})


module.exports = route