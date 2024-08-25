const express = require('express');
const cors = require('cors');
const app = express();

// connect to database
const connectDB = require('./db/connect');
const chatRoom = require('./models/chatRoom');

// config .env file
require('dotenv').config();

// routes
const chatRoomRoutes = require('./routes/chatRoomRoutes')

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/AnonymousChatroom',chatRoomRoutes);

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

        app.listen(PORT,()=>{
            console.log(`Server started at http://localhost:${PORT}`);
        })

    } catch (error){
        console.log("Error While Connect to DB : ",error);
    }
}

start();