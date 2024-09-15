const ChatRoom = require('../models/chatRoom');
const Messages = require('../models/messages');

const saveMessage = async (roomId,sender,data)=>{
    try{
        let message = new Messages({
            roomId,
            sender,
            data,
        });
        message.save();
    }
    catch(e){
        throw e;
    }

    return 0;

}

module.exports = saveMessage;