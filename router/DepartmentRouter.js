const express = require('express');
const router = express.Router()

const depCtrl = require('../controllers/depCtrl');
const check_login = require("../middlewares/check_login")
const flash = require('../middlewares/flash');
const check_depa = require("../middlewares/check_depa")

router.get('/home', flash, check_login, check_depa, depCtrl.show_home)
router.get('/noti', flash, check_login, check_depa, depCtrl.show_noti)



module.exports = router;
