const ChatRoom = require('../models/chatRoom');
const Messages = require('../models/messages');

const getRoomById = async (req,res,next)=>{
    let room;
    let messages;
    try{
        console.log("getting room with id = "+req.query.roomId);
        room = await ChatRoom.findById(req.query.roomId);
        messages = await Messages.find({ roomId: req.query.roomId });
    }
    catch(e){
        return next(e)
    }
    if(room == null){
        return res.status(500).json({
            error: "Room not found."
        })
    }
    res.json({
        Room: room,
        Messages: messages
    });
}

module.exports = getRoomById;