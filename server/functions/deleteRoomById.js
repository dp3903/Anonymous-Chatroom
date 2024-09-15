const ChatRoom = require('../models/chatRoom');

const deleteRoomById = async (roomId)=>{
    let room;
    try{
        console.log("deleting room with id = "+roomId);
        room = await ChatRoom.findByIdAndDelete(roomId);
    }
    catch(e){
        throw e;
    }
    if(room == null){
        throw new error("no room found.");
    }
    return 0;
}

module.exports = deleteRoomById;