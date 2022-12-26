const express = require('express');
const router = express.Router()

const postCtrl = require('../controllers/postCtrl');
const check_login = require("../middlewares/check_login")

router.post('/cmt', check_login, postCtrl.add_cmt)
router.get('/d-cmt/:cmt_id/:post_id', check_login, postCtrl.delete_cmt)
router.get('/get_post', check_login, postCtrl.get_post)
router.get('/delete/:id', check_login, postCtrl.delete_post)
router.post('/edit', check_login, postCtrl.edit_post)
router.post('/', check_login, postCtrl.create_post)


module.exports = router;
