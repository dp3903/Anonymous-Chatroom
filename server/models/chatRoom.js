const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('ChatRoom', chatroomSchema);