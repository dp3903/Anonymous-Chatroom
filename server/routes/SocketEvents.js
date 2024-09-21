const joinRoomById = require("../functions/joinRoomById");
const saveMessage = require("../functions/sendMessage");
const leaveRoomById = require("../functions/leaveRoomById");

function SocketEvents(io){

    io.on("connection", async (socket)=>{
        
        const { user,roomId } = socket.handshake.query;
        
        // Joining a specific room
        try{
            socket.join(roomId);
            await joinRoomById(user,roomId);
            console.log('A user connected: ' + user + " for room: " + roomId);
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
                console.log('User disconnected: ' + user);
                io.to(roomId).emit('left', {user});
            }
            catch(error){
                socket.emit("error",{error});
                socket.disconnect();
            }

            socket.disconnect();
            
        });
    });
}

module.exports = SocketEvents;