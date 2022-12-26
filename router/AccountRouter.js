const express = require('express')
const router = express.Router()
const accCtrl = require('../controllers/accCtrl');
const check_login = require("../middlewares/check_login")
const check_admin = require("../middlewares/check_admin")

router.post('/create', check_login, check_admin, accCtrl.create_department)
router.post('/change-pass', check_login, accCtrl.change_pass)
router.get('/profile/:id', check_login, accCtrl.show_profile)
module.exports = router;
