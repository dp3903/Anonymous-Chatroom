const express = require('express');
const cors = require('cors');
const app = express();

// connect to database
const connectDB = require('./db/connect');

// config .env file
require('dotenv').config();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/',(req,res,next)=>{
    res.send(`
        {
            "message": "Connected to Server Successfully."
        }`
    );
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