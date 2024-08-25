const ChatRoom = require('../models/chatRoom');

const joinRoomById = async (req,res,next)=>{
    let room;
    try{
        console.log("joining room with id = "+req.body.roomId);
        console.log("user = "+req.body.user);
        room = await ChatRoom.findById(req.body.roomId);
        room.members.push(req.body.user);
        await room.save();
    }
    catch(e){
        return next(e)
    }
    if(room == null){
        return res.json({
            error: "Room not found."
        })
    }
    res.json({
        message: "Room joined successfully.",
        Room: room
    });
}

module.exports = joinRoomById;