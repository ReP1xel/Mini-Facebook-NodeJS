const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    avatar_user: { type: String, required: true },
    content: { type: String, required: true },
}, {
    timestamps: true
});

const postSchema = new Schema({
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    avatar_user: { type: String },
    content: { type: String, required: true },
    image_link: { type: String },
    youtube_link: { type: String },
    comments: [commentSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
