const User = require("../models/User")
const Notification = require("../models/Notification")
const Post = require("../models/Post")
const multiparty = require('multiparty');
const upload_file = require('../middlewares/upload_file')
const topic = require("../topic")
const depCtrl = {
    show_home: async (req, res) => {
        res.render("./department/home")
    },
    show_noti: async (req, res) => {
        let user = req.user
        let categories = user.categories
        my_cate = []
        topic.forEach((t, index) => {
            if (categories.includes(+index)) {
                my_cate.push({ id: index, title: t })
            }
        })
        let notis = await Notification
            .find({ username: user.username })
            .sort({ createdAt: -1 })
            .lean();
        res.render("./department/noti", { my_cate, notis })
    },
}


module.exports = depCtrl