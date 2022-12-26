const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    name: { type: String },
    role: { type: String },
    avatar: { type: String, default: "/images/default.jpg" },
    categories: { type: Array },
    class: { type: String },
    faculty: { type: String },
});

module.exports = mongoose.model('User', userSchema);