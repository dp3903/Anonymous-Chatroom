const ChatRoom = require('../models/chatRoom');
const Messages = require('../models/messages');

const saveMessage = async (roomId,sender,data)=>{
    let message;
    try{
        message = new Messages({
            roomId,
            sender,
            data,
        });
        message.save();
    }
    catch(e){
        throw e;
    }

    return message;

}

module.exports = saveMessage;