const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIO(server,{
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://anonymous-chatroom-client-m0kxzjqtr-dp3903s-projects.vercel.app/"]
    }
});

// connect to database
const connectDB = require('./db/connect');
const chatRoom = require('./models/chatRoom');

// config .env file
require('dotenv').config();

// routes
const chatRoomRoutes = require('./routes/chatRoomRoutes');
const SocketEvents = require('./routes/SocketEvents');

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/AnonymousChatroom',chatRoomRoutes);
io.on("connection",()=>{console.log("connected.")});

app.use((req, res, next) => {
    const error = new Error("Could not find this route.", 404);
    throw error;
});
  
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(500);
    res.json({ message: error.message || "An unknown error occurred!" });
    console.log(error);
});

const start = async () => {
    try {
        await connectDB(process.env.Mongodb_Connection_String);

        server.listen(PORT,()=>{
            console.log(`Server started at http://localhost:${PORT}`);
            SocketEvents(io);
        })

    } catch (error){
        console.log("Error While Connect to DB : ",error);
    }
}

start();