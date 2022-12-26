const bcrypt = require('bcrypt')
const User = require("../models/User")
const Notification = require("../models/Notification")
const Post = require("../models/Post")
const multiparty = require('multiparty');
const upload_file = require('../middlewares/upload_file')
const mongoose = require('mongoose');
const postCtrl = {
    create_post: async (req, res) => {
        let user = req.user
        var form = new multiparty.Form();
        form.parse(req, async function (err, fields, files) {
            if (err) console.error(err);
            let content = fields.content[0]
            let youtube_link = fields.youtube_link[0];
            if (youtube_link && !youtube_link.startsWith('https://www.youtube.com/watch?v=')) {
                return res.json({ result: false, msg: "Invalid youtube link!" })
            }
            if (youtube_link) youtube_link = youtube_link.replace("watch?v=", "embed/")
            let image_link = "";
            if (files.image[0].originalFilename != "") {
                image_link = await upload_file(files.image[0])
            }
            let post = new Post({
                content,
                youtube_link,
                image_link,
                user_id: user._id,
                user_name: user.name || user.username,
                avatar_user: user.avatar
            })
            await post.save();
            return res.json({ result: true, msg: "Post was saved successfully!", post })
        })
    },
    delete_post: async (req, res) => {
        let id = req.params.id;
        let post = await Post.findOne({ _id: id });
        if (!post) {
            return res.json({ result: false, msg: "Post not found" })
        }
        if (post.user_id != req.user._id && req.user.role != "admin") {
            return res.json({ result: false, msg: "Access denied" })
        }
        await Post.findOneAndRemove({ _id: id })
        return res.json({ result: true, msg: "Post deleted" })
    },
    edit_post: async (req, res) => {
        let user = req.user
        var form = new multiparty.Form();
        form.parse(req, async function (err, fields, files) {
            if (err) console.error(err);
            let content = fields.content[0]
            let id_p = fields.id[0]
            let post = await Post.findOne({ _id: id_p })
            if (!post) return res.json({ result: false, msg: "Post not found" })
            if (post.user_id != user._id.toString() && user.role != "admin")
                return res.json({ result: false, msg: "Access denied" })
            let youtube_link = fields.youtube_link[0];
            if (youtube_link && !youtube_link.startsWith('https://www.youtube.com/watch?v=')) {
                return res.json({ result: false, msg: "Invalid youtube link!" })
            }
            if (youtube_link) youtube_link = youtube_link.replace("watch?v=", "embed/")
            let image_link = post.image_link;
            if (files.image[0].originalFilename != "") {
                image_link = await upload_file(files.image[0])
            }
            let data = {
                content,
                youtube_link,
                image_link,
                user_id: user._id,
                user_name: user.name || user.username,
                avatar_user: user.avatar
            }
            await Post.findOneAndUpdate({ _id: id_p }, data, { new: true })
            let new_p = await Post.findOne({ _id: id_p }).lean()
            return res.json({ result: true, msg: "Post was saved successfully!", post: new_p, me: req.user._id })
        })
    },
    get_post: async (req, res) => {
        let { page, user_id } = req.query;
        let conditions = {}
        if (user_id == "me") user_id = req.user._id
        if (user_id) conditions.user_id = user_id
        const posts = await Post.find(conditions)
            .sort({ createdAt: -1 })
            .skip(page * 10)
            .limit(10)
            .lean();
        return res.json({ posts, me: req.user._id });
    },
    add_cmt: async function (req, res) {
        try {
            const user = req.user
            let { content, id } = req.body;
            const cmt_id = new mongoose.Types.ObjectId()
            const cmt = { _id: cmt_id, user_id: user._id, username: user.name, avatar_user: user.avatar, content }
            const post = await Post.findOne({ _id: id });
            if (!post) return res.json({ result: false, msg: "Post not found!" })
            post.comments.push(cmt);
            await post.save();
            return res.json({ result: true, msg: "Comment saved!", cmt })
        } catch (e) {
            return res.json({ result: false, msg: e.message });
        }
    },
    delete_cmt: async (req, res) => {
        let { cmt_id, post_id } = req.params
        let post = await Post.findOne({ _id: post_id })
        if (!post) return res.json({ result: false, msg: "Post not found" });
        const cmt = post.comments.id(cmt_id);
        cmt.remove();
        await post.save();
        return res.json({ result: true, msg: "Comment deleted successfully" });
    }
}


module.exports = postCtrl