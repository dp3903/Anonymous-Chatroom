const ChatRoom = require('../models/chatRoom');

const deleteRoomById = async (req,res,next)=>{
    let room;
    try{
        console.log("deleting room with id = "+req.body.roomId);
        room = await ChatRoom.findByIdAndDelete(req.body.roomId);
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
        message: "Room successfully deleted.",
        Room: room
    });
}

exports.deleteRoomById = deleteRoomById;