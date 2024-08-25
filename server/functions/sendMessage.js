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
        throw new Error("message could not be saved.\nError: "+e.message);
    }

}

module.exports = saveMessage;