const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { v4:uuidv4 } = require('uuid');

const Messages = require('./messages')
  

const chatroomSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => {
            return uuidv4().substring(0,6);
        }
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    members: {
        type: [String],
        required: true,
    }
})

chatroomSchema.plugin(uniqueValidator);

// Ensure no unique index on members
chatroomSchema.index({ members: 1 }, { unique: false });

// middleware to handle cascading delete
chatroomSchema.pre('findByIdAndRemove', async function(next) {
    const chatroomId = this._id;
    await Messages.deleteMany({ roomId: chatroomId });
    next();
});

// Pre-save middleware to validate unique members
chatroomSchema.pre('save', function(next) {
    const uniqueMembers = new Set(this.members);
    if (uniqueMembers.size !== this.members.length) {
        return next(new Error('Member names must be unique within the chatroom.'));
    }
    next();
});

module.exports = mongoose.model('ChatRoom', chatroomSchema);