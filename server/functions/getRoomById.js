const ChatRoom = require('../models/chatRoom');

const getRoomById = async (req,res,next)=>{
    let room;
    try{
        console.log("getting room with id = "+req.body.roomId);
        room = await ChatRoom.findById(req.body.roomId);
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
        Room: room
    });
}

module.exports = getRoomById;