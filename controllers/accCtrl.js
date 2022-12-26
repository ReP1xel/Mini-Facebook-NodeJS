const bcrypt = require('bcrypt')
const User = require("../models/User")
const authCtrl = {
    create_department: async (req, res) => {
        let { username, categories } = req.body
        try {
            const user = await User.findOne({ username })
            if (user) {
                // TODO: Trung username

            } else {
                let password_hashed = bcrypt.hashSync(username, 10);
                let newUser = new User({ username, password: password_hashed, categories, role: "department" })
                await newUser.save();
                return res.json({ success: true, message: "Create user" })
            }
        } catch (err) {
            console.log(err)
        }
    },
    change_pass: async (req, res) => {
        let { old_pass, new_pass, conf_pass } = req.body
        let user = await User.findOne({ _id: req.user._id })
        if (bcrypt.compareSync(old_pass, user.password)) {
            if (new_pass !== conf_pass) {
                req.session.flash = { type: "error", title: "Error", content: "Xác nhận mật khẩu không chính xác" }
                res.redirect('back')
            } else if (new_pass.length < 8) {
                req.session.flash = { type: "error", title: "Error", content: "Mật khẩu cần lớn hơn 8 kí tự" }
                res.redirect('back')
            } else {
                let password_hashed = bcrypt.hashSync(new_pass, 10);
                await User.findOneAndUpdate({ _id: user._id }, { password: password_hashed })
                req.session.flash = { type: "success", title: "Success", content: "Đổi mật khẩu thành công" }
                res.redirect('back')
            }
        } else {
            req.session.flash = { type: "error", title: "Error", content: "Mật khẩu không chính xác" }
            res.redirect('back')
        }
    },
    show_profile: async (req, res) => {
        try {
            let id = req.params.id
            let user = await User.findOne({ _id: id }).lean();
            console.log(id)
            if (!user)
                res.redirect("back");
            else {
                res.render("./student/profile", {
                    user,
                    me: req.user,
                    is_me: user._id == (req.user._id).toString(),
                    is_admin: user.role == "admin",
                    is_department: user.role == "department",
                    is_student: user.role == "student"
                })
            }
        } catch (e) {
            res.redirect("back");
        }
    }
}


module.exports = authCtrl