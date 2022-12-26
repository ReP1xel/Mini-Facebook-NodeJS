const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
    username: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Notification', notificationSchema);