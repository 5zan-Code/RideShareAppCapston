const express = require('express')
const route = express.Router()
const mdb_post_like = require('../model/post_like_model')
let response = {id: "", msg: "", statusCode: 0}

route.post('/post_like', async (req,res)=>{
        let postLikeData = new mdb_post_like()

    let isLiked = await postLikeData.collection.find({ $and: [{ postId: req.body.postId }, { userId: req.body.userId }] })
    .toArray(function (err, result) {
        
        if (result.length >0) {

            var mResult = postLikeData.collection.deleteOne({ _id: result[0]._id }, function (err, obj) {
                    response.msg = "post unLiked";
                    response.statusCode = 200;
                res.json(response)
            });
        
        } else {
            postLikeData.postId = req.body.postId
            postLikeData.userId = req.body.userId

            let newLikeData = postLikeData.save()
            response.id = postLikeData.id
            response.msg = "post liked"
            response.statusCode = 200
            res.json(response)
        }
    })
    });
      
        
  
    

module.exports = route

