const bcrypt = require('bcrypt');
const User = require("../models/User")
const Notification = require("../models/Notification")
const Post = require("../models/Post")
const multiparty = require('multiparty');
const upload_file = require('../middlewares/upload_file')
const adCtrl = {
    show_home: async (req, res) => {
        res.render('./admin/home')
    },
    show_account: (req, res) => {
        res.render('./admin/account')
    },
    create_account: async (req, res) => {
        let { username, name, categories } = req.body
        if (!categories) {
            req.session.flash = { type: "error", title: "Error", content: "Empty categories" }
            res.redirect('/admin/account')
            return;
        }
        try {
            const user = await User.findOne({ username })
            if (user) {
                req.session.flash = { type: "error", title: "Username was exists", content: "Username was exists!" }
                res.redirect('/admin/account')
            } else {
                let password_hashed = bcrypt.hashSync(username, 10);
                let newUser = new User({ username, password: password_hashed, name, categories, role: "department" })
                await newUser.save();
                req.session.flash = { type: "success", title: "Success", content: "Department account was saved!" }
                res.redirect('/admin/account')
            }
        } catch (err) {
            req.session.flash = { type: "error", title: "Error", content: err.message }
            res.redirect('/admin/account')
        }
    }
}


module.exports = adCtrl