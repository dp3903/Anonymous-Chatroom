const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        ref: 'ChatRoom',
    },
    sender: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('Messages', messageSchema);