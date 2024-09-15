const ChatRoom = require('../models/chatRoom');

const joinRoomById = async (user,roomId)=>{
    if(!(roomId && user)){
        return -1;
    }
    let room;
    try{
        console.log("joining room with id = "+roomId);
        console.log("user = "+user);
        room = await ChatRoom.findById(roomId);
        if(room == null){
            throw new error("no such room.")
        }
        room.members.push(user);
        await room.save();
    }
    catch(e){
        throw e;
    }
    return 0;
}

module.exports = joinRoomById;