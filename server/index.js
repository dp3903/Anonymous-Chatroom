const express = require('express');
const cors = require('cors');
const app = express();
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

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})