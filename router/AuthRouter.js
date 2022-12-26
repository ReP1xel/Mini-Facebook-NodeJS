const express = require('express');
const passport = require('passport');

const router = express.Router()
const authCtrl = require('../controllers/authCtrl');
const flash = require('../middlewares/flash');
require('../config/passport');

router.route('/login')
    .get(flash, authCtrl.show_login_page)
    .post(authCtrl.login)
router.use(passport.initialize());
router.use(passport.session());
router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/failure', (req, res) => { res.redirect("/login") })
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google/failure' }), authCtrl.google_call_back);
router.get("/", (req, res) => res.redirect("/login"))



module.exports = router;
