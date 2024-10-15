const express = require('express');
const session = require('express-session');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
};

const io = socketIO(server,{
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling']    // Fall back to polling if WebSocket fails
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

const PORT = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());
// Express session middleware
const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if you're using HTTPS
});

app.use(sessionMiddleware);
// Share session middleware with Socket.io
io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});


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
