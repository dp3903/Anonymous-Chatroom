const ChatRoom = require('../models/chatRoom');
const deleteRoomById = require('./deleteRoomById');

const leaveRoomById = async (roomId, user)=>{
    if(!(roomId && user)){
        return -1;
    }
    let room;
    try{
        console.log("leaving room with id = "+roomId);
        console.log("user = "+user);
        room = await ChatRoom.findById(roomId);
        if(room == null){
            throw new error("no room found.")
        }
        room.members.pull(user);
        await room.save();
        if(room.members.length == 0){
            await deleteRoomById(roomId);
        }
    }
    catch(e){
        console.log("some error occured: "+e.message);
        throw e;
    }
    
    return 0;
}

module.exports = leaveRoomById;