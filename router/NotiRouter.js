const express = require('express');
const router = express.Router()

const notiCtrl = require('../controllers/notiCtrl');
const check_login = require("../middlewares/check_login")
const check_depa = require("../middlewares/check_depa")

router.post('/edit', check_login, check_depa, notiCtrl.edit_noti)
router.get('/delete/:id', check_login, check_depa, notiCtrl.delete_noti)
router.post('/', check_login, check_depa, notiCtrl.create_noti)


module.exports = router;
