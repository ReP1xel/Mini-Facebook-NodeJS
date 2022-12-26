const express = require('express');
const router = express.Router()

const stdCtrl = require('../controllers/stdCtrl');
const check_login = require("../middlewares/check_login")
const flash = require('../middlewares/flash');

router.get('/home', flash, check_login, stdCtrl.show_home)
router.get('/me', flash, check_login, stdCtrl.show_profile_me)
router.post('/me', check_login, stdCtrl.update_profile)
router.get('/noti', check_login, stdCtrl.show_noti)
router.get('/noti-cate', check_login, stdCtrl.show_noti_cate)
// router.get('/profile/:id', check_login, stdCtrl.show_profile)
router.get('/noti-detail/:id', check_login, stdCtrl.show_detail_noti)


module.exports = router;
