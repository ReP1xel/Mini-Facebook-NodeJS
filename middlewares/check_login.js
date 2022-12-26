const User = require('../models/User')
const jwt = require('jsonwebtoken')
const credentials = require("../credentials")
module.exports = async function check_login(req, res, next) {
    let token = req.cookies.user
    jwt.verify(token, credentials.secret_key, async function (err, decoded) {
        if (err) console.log(err)
        let id = decoded.id;
        let user = await User.findOne({ _id: id })
        if (!user) {
            req.session.flash = { type: "error", title: "Error", content: "Please login" }
            res.redirect('/login')
        } else {
            req.user = user;
            next();
        }
    });
};
