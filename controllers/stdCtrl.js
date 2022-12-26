const User = require("../models/User")
const Notification = require("../models/Notification")
const Post = require("../models/Post")
const multiparty = require('multiparty');
const upload_file = require('../middlewares/upload_file')
const postCtrl = {
    show_home: async (req, res) => {
        let notis = await Notification.find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .lean()
        res.render("./student/home", { notis })
    },
    show_detail_noti: async (req, res) => {
        try {
            let id = req.params.id;
            let noti = await Notification.findById(id).lean();
            if (!noti)
                res.redirect("/student/home");
            res.render("./student/detail_noti", { noti })
        } catch (e) {
            res.redirect("/student/home");
        }
    },
    show_profile_me: async (req, res) => {
        let user = await User.findOne({ _id: req.user._id }).lean()
        res.render("./student/profile", { user, me: user, is_me: true })
    },
    update_profile: async (req, res) => {
        var form = new multiparty.Form();
        form.parse(req, async function (err, fields, files) {
            if (err) console.error(err);
            let name = fields.name[0]
            let faculty = fields.faculty[0]
            let class_user = fields.class[0]
            let avatar = req.user.avatar
            if (files.image[0].originalFilename != "") {
                avatar = await upload_file(files.image[0])
            }
            let data = { name, class: class_user, avatar, faculty }
            await User.findByIdAndUpdate({ _id: req.user._id }, data)
            req.session.flash = { type: "success", title: "Success", content: "Data updated successfully" }
            res.redirect("/student/me")
        });
    },
    show_noti: async (req, res) => {
        let { page, cate } = req.query
        if(!page) 
            page = 0    
        let condition = {}
        if (cate) condition.category = cate + ""
        let notis = await Notification.find(condition)
            .sort({ createdAt: -1 })
            .limit(10)
            .skip(page * 10)
            .lean()
        res.render("./student/noti", { notis, cate })
    },
    show_noti_cate: async (req, res) => {
        res.render("./student/noti_cate")
    }
}


module.exports = postCtrl