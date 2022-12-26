const bcrypt = require('bcrypt');
const User = require("../models/User")
const jwt = require('jsonwebtoken')
const credentials = require("../credentials")
const authCtrl = {
    show_login_page: async (req, res) => {
        res.render("login")
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })
        if (!user) {
            req.session.flash = { type: "error", title: "User not found", content: "Username or password is incorrect" }
            res.redirect('/login')
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                var token = jwt.sign({ id: user._id }, credentials.secret_key);
                res.cookie('user', token)
                if (user.role == "admin") {
                    res.redirect('/admin/home')
                } else if (user.role == "department") {
                    res.redirect('/department/home')
                } else {
                    req.session.flash = { type: "error", title: "Error", content: "Invalid role" }
                    res.redirect('/login')
                }
            } else {
                req.session.flash = { type: "error", title: "User not found", content: "Username or password is incorrect" }
                res.redirect('/login')
            }
        }
    },
    google_call_back: async (req, res) => {
        let email = req.user.emails[0].value
        let name = req.user.displayName
        let avt = req.user.photos[0].value;
        if (email.endsWith("@student.tdtu.edu.vn") || email.endsWith("@tdtu.edu.vn")) {
            let user = await User.findOne({ email })
            if (!user) {
                let newUser = new User({ email, name, role: "student", avatar: avt })
                await newUser.save()
                let token = jwt.sign({ id: newUser._id }, credentials.secret_key);
                res.cookie('user', token)
                res.redirect('/student/home')
            } else {
                let token = jwt.sign({ id: user._id }, credentials.secret_key);
                res.cookie('user', token)
                res.redirect('/student/home')
            }
        } else {
            req.session.flash = { type: "error", title: "Từ chối đăng nhập", content: "Tài khoản không thuốc phạm vị TDTU" }
            res.redirect('/login')
        }
    }
}


module.exports = authCtrl