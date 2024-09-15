const joinRoomById = require("../functions/joinRoomById");
const saveMessage = require("../functions/sendMessage");
const leaveRoomById = require("../functions/leaveRoomById");

function SocketEvents(io){

    io.on("connection", async (socket)=>{
        
        const { user,roomId } = socket.handshake.query;
        
        // Joining a specific room
        try{
            await joinRoomById(user,roomId);
            socket.join(roomId);
            console.log('A user connected: ' + user + " for room: " + roomId);
        }
        catch(error){
            socket.emit("error",{error});
            socket.disconnect();
        }
        
        
        // Listening for chat messages within a room
        socket.on('chatMessage', async ({ roomId, user, message }) => {
            console.log(`Message in room ${roomId} from ${user}: ${message}`);
            try{
                await saveMessage(roomId,user,message);
                io.to(room).emit('message', {user,message});
            }
            catch(error){
                socket.emit("error",{error});
                socket.disconnect();
            }
        });
        
        // Handle when a user disconnects
        socket.on('predisconnect', async ({roomId, user}) => {
            console.log(`for ${user} in room ${roomId} disconnecting...`);
            try{
                await leaveRoomById(roomId,user);
                console.log('User disconnected: ' + user);
                io.to(room).emit('left', {user});
            }
            catch(error){
                socket.emit("error",{error});
                socket.disconnect();
            }
            
        });
    });
}

module.exports = SocketEvents;