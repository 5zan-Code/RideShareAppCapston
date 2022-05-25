const express = require('express')
const router = express.Router()
const registerApi = require('../controller/user_registration')
const postApi = require('../controller/user_post')
const post_like = require('../controller/post_like')
const user_comment = require('../controller/insert_comment')
const validator = require('../controller/validatore')


router.use(registerApi)
router.use(postApi)
router.use(post_like)
router.use(user_comment)
router.use(validator)

module.exports = router