const ChatRoom = require('../models/chatRoom');

const createRoom = async (req,res,next)=>{
    let room;
    try{
        console.log("creating new room by "+req.body.creator);
        const { name,creator } = req.body;
        room = new ChatRoom({
            name,
            members: [],
        });
        await room.save();
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({
            error: "Could not create new chatroom. probably room with the same name exists. try again with a different name."
        })
    }
    if(room == null){
        return res.status(500).json({
            error: "Room could not be created. please try again."
        })
    }
    res.status(201).json({
        Room: room.toObject({getters: true}),
    });
}

module.exports = createRoom;