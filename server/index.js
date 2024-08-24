const express = require('express');
const cors = require('cors');
const app = express();
<<<<<<< HEAD

// connect to database
const connectDB = require('./db/connect');

// config .env file
require('dotenv').config();

=======
>>>>>>> f004cb37241792bbf86e70ac79720f6feb5c541c
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

<<<<<<< HEAD
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
=======
app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})
>>>>>>> f004cb37241792bbf86e70ac79720f6feb5c541c
