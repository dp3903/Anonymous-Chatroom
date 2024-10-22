const joinRoomById = require("../functions/joinRoomById");
const saveMessage = require("../functions/sendMessage");
const leaveRoomById = require("../functions/leaveRoomById");

function SocketEvents(io){

    io.on("connection", async (socket)=>{
        
        const { user,roomId } = socket.handshake.query;
        const session = socket.request.session;
        // Joining a specific room
        try{
            socket.join(roomId);
            await joinRoomById(user,roomId);
            let newmess = await saveMessage(roomId,'__$SYSTEM$__',`${user} has joined the room.`);
            io.to(roomId).emit('message', {newmess});
            console.log('A user connected: ' + user + " for room: " + roomId);
            session.roomId = roomId;
            session.user = user;
            
        }
        catch(error){
            console.log(error);
            socket.emit("error",{error});
            // socket.disconnect();
        }
        
        io.to(roomId).emit('newuser',{newuser: user});
        // Listening for chat messages within a room
        socket.on('chatMessage', async ({ roomId, user, message }) => {
            console.log(`Message in room ${roomId} from ${user}: ${message}`);
            try{
                let newmess = await saveMessage(roomId,user,message);
                io.to(roomId).emit('message', {newmess});
            }
            catch(error){
                console.log(error);
                socket.emit("error",{error});
                // socket.disconnect();
            }
        });
        
        // Handle when a user disconnects
        socket.on('leaving',async ({roomId, user}) => {
            // console.log(message);

            console.log(`for ${user} in room ${roomId} disconnecting...`);
            try{
                await leaveRoomById(roomId,user);
                let newmess = await saveMessage(roomId,'__$SYSTEM$__',`${user} has left the room.`);
                io.to(roomId).emit('message', {newmess});
                console.log('User disconnected: ' + user);
                io.to(roomId).emit('left', {user});
            }
            catch(error){
                socket.emit("error",{error});
                socket.disconnect();
            }

            socket.disconnect();
            
        });

        socket.on('disconnect',async () => {
            console.log(`for ${session.user} in room ${session.roomId} disconnecting...`);
            try{
                await leaveRoomById(session.roomId,session.user);
                let newmess = await saveMessage(session.roomId,'__$SYSTEM$__',`${session.user} has left the room.`);
                io.to(roomId).emit('message', {newmess});
                console.log('User disconnected: ' + session.user);
                io.to(roomId).emit('left', {user: session.user});
            }
            catch(error){
                socket.emit("error",{error});
                socket.disconnect();
            }
            session.destroy();
        });
    });
}

module.exports = SocketEvents;