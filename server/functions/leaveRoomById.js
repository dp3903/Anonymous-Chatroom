const ChatRoom = require('../models/chatRoom');

const leaveRoomById = async (req,res,next)=>{
    let room;
    try{
        console.log("leaving room with id = "+req.body.roomId);
        console.log("user = "+req.body.user);
        room = await ChatRoom.findById(req.body.roomId);
        room.members.pull(req.body.user);
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
        message: "Room left successfully.",
        Room: room
    });
}

module.exports = leaveRoomById;