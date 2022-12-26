const bcrypt = require('bcrypt')
const User = require("../models/User")
const Notification = require("../models/Notification")
const authCtrl = {
    create_noti: async (req, res) => {
        let user = req.user
        let { title, content, category } = req.body
        try {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let date_time = date + " (" + time + ")";
            let noti = new Notification({ username: user.username, category, title, content, date: date_time })
            await noti.save();
            req.session.flash = { type: "success", title: "Success", content: "Notification was successfully saved", socket: true, noti }
            res.redirect('back')
        } catch (e) {
            req.session.flash = { type: "error", title: "Error", content: e.message }
            res.redirect('back')
        }
    },
    edit_noti: async (req, res) => {
        try {
            let { title, content, category, id } = req.body
            let noti = await Notification.findById(id)
            if (noti.username !== req.user.username) {
                req.session.flash = { type: "error", title: "Errors", content: "Access denied" }
                res.redirect("back");
                return;
            }
            await Notification.findOneAndUpdate({ _id: id }, { title, content, category })
            req.session.flash = { type: "success", title: "Success", content: "Notification updated" }
            res.redirect("back");
        } catch (e) {
            req.session.flash = { type: "error", title: "Errors", content: e.message }
            res.redirect("back");
        }
    },
    delete_noti: async (req, res) => {
        let id = req.params.id
        let noti = await Notification.findById(id)
        if (noti.username !== req.user.username) {
            req.session.flash = { type: "error", title: "Errors", content: "Access denied" }
            res.redirect("back");
            return;
        }
        await Notification.findOneAndRemove({ _id: id })
        req.session.flash = { type: "success", title: "Success", content: "Notification deleted" }
        res.redirect("back");
    }
}


module.exports = authCtrl