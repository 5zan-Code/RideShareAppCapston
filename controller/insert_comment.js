const express = require('express')
const route = express.Router()
const mdb_user_comment = require('../model/comment_model')

let response = {id:0, msg:"", statusCode: 0, comments: []}

route.post('/insert_comment', async (req,res)=>{
    let commentData = new mdb_user_comment()
    commentData.userId = req.body.userId
    commentData.postId = req.body.postId
    commentData.comment_text = req.body.comment_text

    let newCommentData = await commentData.save()
    response.id = commentData.id
    response.msg = "comment inserted."
    response.statusCode = 200

    res.json(response)
    response.comments = []
    response.msg = ""
    response.statusCode = 0
})

route.post('/get_comment', async (req, res) => {
    let commentData = new mdb_user_comment()
    await commentData.collection.find({ postId: req.body.postId })
        .toArray(function (err, result) {
            if (result.length > 0) {
                response.comments = result
            } else {
                response.msg = "no comment found"
                response.statusCode = 200
            }
            res.json(response)
            response.comments = []
            response.msg = ""
            response.statusCode = 0
        })
})


module.exports = route