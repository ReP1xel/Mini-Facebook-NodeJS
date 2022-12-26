const express = require('express');
const router = express.Router()

const adCtrl = require('../controllers/adCtrl');
const check_login = require("../middlewares/check_login")
const flash = require('../middlewares/flash');
const check_admin = require("../middlewares/check_admin")

router.get('/home', flash, check_login, check_admin, adCtrl.show_home)
router.get('/account', flash, check_login, check_admin, adCtrl.show_account)
router.post('/account', check_login, check_admin, adCtrl.create_account)


module.exports = router;
